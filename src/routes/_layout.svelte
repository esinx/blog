<script>
  import { stores, goto } from "@sapper/app";
  import { fade, fly } from "svelte/transition";
  import Nav from "#components/Nav.svelte";

  const { page, preloading, session } = stores();
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
  {#if $preloading}

  {:else}
    <div
      in:fly={{ y: 200, duration: 500 }}
      out:fly={{ y: -200, duration: 500 }}>
      <slot />
    </div>
  {/if}
</main>
