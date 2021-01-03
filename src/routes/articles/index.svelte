<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/data/article`);
    const data = await res.json();
    return {
      articles: data
    };
  }
</script>

<script>
  export let articles;
  $: articles = articles.map(article => ({
    ...article,
    date: new Date(article.date).toDateString()
  }));
</script>

<style lang="scss">
  .article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    .article {
      text-decoration: none;
      color: #000;
      border-radius: 10px;
      padding: 15px;
      transition: all 0.3s;
      &:hover {
        cursor: pointer;
        background: #eee;
      }
      .title {
        font-size: 20px;
        font-weight: 700;
      }
      .slug {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
</style>

<div class="article-list">
  {#each articles as { title, slug, date, tags } (slug)}
    <a class="article" href={`/article/${slug}`}>
      <div class="title">{title}</div>
      <div class="slug">{slug}</div>
      <div class="date">{date}</div>
      <div class="tags">{tags.join(', ')}</div>
    </a>
  {/each}
</div>
