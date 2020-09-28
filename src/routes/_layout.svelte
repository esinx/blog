<script context="module">
  export async function preload(_, session) {
    const { GA_MEASUREMENT_ID } = session;
    return { GA_MEASUREMENT_ID };
  }
</script>

<script>
  import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
  import { stores, goto } from "@sapper/app";
  import { fade, fly } from "svelte/transition";
  import Nav from "#components/Nav.svelte";

  export let GA_MEASUREMENT_ID = "";
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
<GoogleAnalytics {stores} id={GA_MEASUREMENT_ID} />
