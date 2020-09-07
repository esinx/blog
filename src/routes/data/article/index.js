import { getArticlePaths, parseArticleMeta } from "./_articles";

export async function get(req, res) {
    const articlePaths = getArticlePaths();
    const data = await Promise.all(
        articlePaths.map((articlePath) => parseArticleMeta(articlePath))
    );
    return res.json(data);
}
