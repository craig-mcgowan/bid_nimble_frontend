<script>
  import CandleLogo from "./candle-logo.svelte";
  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
</script>


<header class = "shadow-lg z-20 flex justify-between px-7 fixed top-0 left-0 w-screen bg-white dark:bg-gray-700 dark:shadow-gray-800 dark:shadow-md" >
  <slot>
    <div on:click={() => goto("/app/")} class="flex justify-between content-center group">
      <CandleLogo />
      <h1 class = "align-middle self-center font-logo text-5xl text-gray-500 group-hover:text-indigo-500 dark:text-yellow-200 cursor-pointer transition-nonem dark:group-hover:text-yellow-400">bid<span class="font-logo2 text-5xl">Nimble</span></h1>
    </div>
    <div class= "login flex justify-between w-60 content-center"> 
      <button on:click={() => goto("/")} class='self-center w-28 h-2/3 text-white bg-violet-700 hover:bg-violet-500 rounded-xl'>Logout</button>
    </div> 
  </slot>
</header>
