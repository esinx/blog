<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style lang="scss">
  .root {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      h1,
      p {
        margin: 0 auto;
      }

      h1 {
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
      }

      p {
        margin: 1em auto;
      }
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="root">
  <div class="content">
    <h1>{status}</h1>

    <p>{error.message}</p>

    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {/if}
  </div>
</div>
