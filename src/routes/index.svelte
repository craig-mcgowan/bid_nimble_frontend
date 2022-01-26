

<script>
  import { onMount } from 'svelte';
  import * as animateScroll from "svelte-scrollto"
  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
  import "../app.css";
  import CandleLogo from "$lib/candle-logo.svelte";
  import { writable } from 'svelte/store';
  import { session } from '$app/stores';
  import Header from '$lib/Header.svelte';
  import GoogleSignInButton from '$lib/GoogleSignInButton.svelte';
  import Logout from '$lib/Logout.svelte'
  import Form from '$lib/form.svelte';
  import FaGithubAlt from 'svelte-icons/fa/FaGithubAlt.svelte'
  let login = {username:"", password: ""}
  import ConstructionMan from "$lib/construction-man.svelte"
  import OfficeMan from '$lib/office-man.svelte';
  import HomeMan from '$lib/home-man.svelte';
  import Carousel from '$lib/carousel/Carousel.svelte';

  let bgVideo
  
  onMount(() => {
    if (typeof bgVideo.loop == "boolean") {
      bgVideo.loop = true;
    } else {
      bgVideo.on(
        "ended",
        () => {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
  });

 
</script>


<main class = "  ">
  <nav class = " pl-20 flex justify-between backdrop-blur-lg bg-blend-sof-light bg-white bg-opacity-10 shadow-sm">
    <div class="flex justify-between content-center group">
      <CandleLogo />
      <h1 class = "align-middle self-center font-logo text-5xl text-gray-500 group-hover:text-indigo-500 dark:text-yellow-200 cursor-pointer transition-nonem dark:group-hover:text-yellow-400">bid<span class="font-logo2 text-5xl">Nimble</span></h1>
    </div>
    <ul class = "flex mr-10 justify-around align-middle w-48">
      <li class="h-min self-center">
        <button  class="bg-gray-400 rounded-2xl bg-opacity-30 hover:bg-white hover:bg-opacity-30 text-white py-1 px-3 hover:scale-125">Sign Up</button>
      </li>
      <li class= "h-min self-center">
        <button on:click={()=> animateScroll.scrollTo({element: '#login'}) } class="bg-gray-400 rounded-2xl bg-opacity-30 hover:bg-white hover:bg-opacity-30 text-white py-1 px-3 hover:scale-110">Log In</button>
      </li>
    </ul>
  </nav>
<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white via-transparent -z-10">
</div>  
  <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 ">
    <video 
    src='../src/lib/bidnimble-bg.mov'
    autoplay
    playbackRate=3
    muted
    videoHeight="full"
    width=100%
    bind:this={bgVideo}
    ></video>
  </div>
  <div class="container mx-auto mt-20">
    <Carousel  />
  </div>

{#await Carousel then }
  
<div id="login" class="mx-auto w-min flex content-center my-80">
  
  <form on:submit|preventDefault class=" flex flex-col w-80 border-sky-900 border p-5 rounded-xl ">
    <label for="username">Username: </label>
    <input id="username" type="text" bind:value={login.username} >
    <label for="password">Password: </label>
    <input id="password" type="password" bind:value={login.password}>
    <input type="submit" value="Login" class= "orange-btn w-28 self-center mt-3">
  </form>
  <div class="h-min self-center mx-4">or</div>
  <a rel="external" href="/login" class="h-min self-center">
    <button class="gray-btn w-56 flex justify-between hover:text-cyan-200 shadow shadow-slate-800"><span class="self-center">Login using Github</span> <span class="h-8"><FaGithubAlt/></span></button>
  </a>  
</div>
{/await}

<footer class = "mt-10 pl-20">
  <p>by Craig McGowan</p>
  <p>craigmcgowandev@gmail.com</p>
</footer>
</main>
