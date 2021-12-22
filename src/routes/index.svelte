<script>
  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
  import CandleLogo from "$lib/candle-logo.svelte";

</script>
<CandleLogo/>
<button on:click={() => goto("/login")} class='self-center w-28 h-2/3 text-white bg-violet-700 hover:bg-violet-500 rounded-xl'>Login</button>
<p class = "text-3xl mx-auto">Main App Component</p>