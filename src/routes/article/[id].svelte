<script context="module">
  export async function preload({ params, query }) {
    const { id } = params;
    const res = await this.fetch(`/data/article/${id}`);
    const data = await res.json();
    return {
      article: data
    };
  }
</script>

<script>
  export let article;

  $: datetext = new Date(article.frontmatter.date).toDateString();
</script>

<svelte:head>
  <link rel="stylesheet" href="/victor-mono/index.css" />
  <title>{article.frontmatter.title}</title>
  <meta name="description" content={article.frontmatter.tags.join(', ')} />
</svelte:head>

<article>
  <header>
    <h1 class="title">{article.frontmatter.title}</h1>
    <div class="meta">
      <div class="tags">
        {#each article.frontmatter.tags as tag}
          <div class="tag">{tag}</div>
        {/each}
      </div>
      <div class="date">{datetext}</div>
    </div>
  </header>
  <div class="content">
    {@html article.html}
  </div>
  <footer>
    <div class="author">
      an article by
      <span class="name">Eunsoo Shin (esinx)</span>
    </div>
  </footer>
</article>
