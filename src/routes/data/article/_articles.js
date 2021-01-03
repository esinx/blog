import fs from "fs";
import path from "path";

import yaml from "yaml";

import unified from "unified";

import remark_parse from "remark-parse";
import remark_frontmatter from "remark-frontmatter";
import remark_code_frontmatter from "remark-code-frontmatter";
import remark_code_extra from "remark-code-extra";
import remark_highlight from "remark-highlight.js";
// import remark_math from "remark-math";

import remark_rehype from "remark-rehype";

// import rehype_katex from "rehype-katex";
import rehype_stringify from "rehype-stringify";
import remark_stringify from "remark-stringify";

const ARTICLES_DIR = process.env.ARTICLES;
const EXT = ".md";

export const getArticlePaths = () =>
  fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => path.extname(name) == EXT)
    .map((name) => path.resolve(ARTICLES_DIR, name));

export const parseArticleMeta = async (articlePath) => {
  const _basename = path.basename(articlePath);
  const slug = _basename.slice(
    0,
    _basename.length - path.extname(_basename).length
  );
  const content = fs.readFileSync(articlePath).toString("utf-8");
  let frontmatter = {};
  const capture_frontmatter = () => (node) => {
    const yaml_frontmatter = node.children.find(({ type }) => type == "yaml");
    frontmatter = yaml.parse(yaml_frontmatter.value);
  };
  const result = await unified()
    .use(remark_parse)
    .use(remark_stringify)
    .use(remark_frontmatter, ["yaml"])
    .use(capture_frontmatter)
    .process(content);
  return { ...frontmatter, slug };
};

export const parseArticle = async (articlePath) => {
  const content = fs.readFileSync(articlePath).toString("utf-8");
  let frontmatter = {};
  const capture_frontmatter = () => (node) => {
    const yaml_frontmatter = node.children.find(({ type }) => type == "yaml");
    frontmatter = yaml.parse(yaml_frontmatter.value);
  };

  const result = await unified()
    .use(remark_parse)
    .use(remark_frontmatter, ["yaml"])
    .use(capture_frontmatter)
    .use(remark_code_frontmatter)
    .use(remark_highlight)
    .use(remark_code_extra, {
      transform: (node) => {
        if (!node.frontmatter) return {};
        const before = node.frontmatter.header && [
          {
            type: "element",
            tagName: "div",
            properties: {
              className: "header",
            },
            children: [
              { type: "text", value: node.frontmatter.name || node.lang },
            ],
          },
        ];
        const after = node.frontmatter.footer && [
          {
            type: "element",
            tagName: "div",
            properties: {
              className: "footer",
            },
            children: [{ type: "text", value: "copy to clipboard" }],
          },
        ];
        return {
          before,
          after,
        };
      },
    })
    // disabled math plugins
    // .use(remark_math)
    .use(remark_rehype)
    // .use(rehype_katex)
    .use(rehype_stringify)
    .process(content);
  return { frontmatter, html: result.contents };
};

export const getArticleBySlug = async (slug) => {
  const articlePath = path.resolve(ARTICLES_DIR, `${slug}${EXT}`);
  return parseArticle(articlePath);
};
