<script>
  import Nav from "#components/Nav.svelte";
</script>

<style lang="scss" global>
  @import "./styles/theme.scss";
  main {
    display: block;
    margin: auto;
    padding: 50px;
    width: 100vw;
    max-width: $site-max-width;
    min-height: 100vh;
  }
</style>

<Nav />

<main>
  <slot />
</main>
