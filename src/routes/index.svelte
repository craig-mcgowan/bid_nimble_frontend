<script>
  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
  import "../app.css";
  import CandleLogo from "$lib/candle-logo.svelte";
  import GoogleSignInButton from '$lib/GoogleSignInButton.svelte';
  import Logout from '$lib/Logout.svelte'
  export let user
</script>
<script context="module">
  export async function load({ session }) {
    return {
      props: {
        user: session.user,
      },
    };
  }

</script>

<CandleLogo/>


{#if user}
<h2>Welcome {user}</h2>
<a rel="external" href="/logout">
  <button class="red-btn">Logout</button>
</a>
{:else}
<a rel="external" href="/login">
  <button class="green-btn">Login using Github</button>
</a>
{/if}


<p class = "text-3xl mx-auto">Main App Component</p>