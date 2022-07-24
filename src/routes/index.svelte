<script>
  import { onMount } from 'svelte';
  import * as animateScroll from "svelte-scrollto"
  import "../app.css";
  import CandleLogo from "$lib/candle-logo.svelte";
  import FaGithubAlt from 'svelte-icons/fa/FaGithubAlt.svelte'
  let login = {username:"", password: ""}
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
  <nav class = " pl-20 flex justify-between backdrop-blur-lg bg-blend-soft-light bg-slate-200 bg-opacity-40 shadow-sm">
    <div class="flex justify-between content-center group">
      <CandleLogo />
      <h1 class = "align-middle self-center font-logo text-5xl text-gray-500 group-hover:text-indigo-500 dark:text-yellow-200 cursor-pointer transition-nonem dark:group-hover:text-yellow-400">bid<span class="font-logo2 text-5xl">Nimble</span></h1>
    </div>
    <ul class = "flex mr-10 justify-around align-middle w-48">
      <li class="h-min self-center">
        <a rel="external" href="/demo">
          <button href="/demo" class="bg-gray-400 rounded-2xl bg-opacity-30 hover:bg-white hover:bg-opacity-30 text-white py-1 px-3 hover:scale-125">Demo</button>
        </a>
      </li>
      <li class= "h-min self-center">
        <button on:click={()=> animateScroll.scrollTo({element: '#login'}) } class="bg-gray-400 rounded-2xl bg-opacity-30 hover:bg-white hover:bg-opacity-30 text-white py-1 px-3 hover:scale-110">Log In</button>
      </li>
    </ul>
  </nav>
<div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t -z-10 bg-opacity-100 from-white via-transparent ">

</div>  
  <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 ">
    <video 
    src='https://res.cloudinary.com/dm9ig1vtk/video/upload/v1643237932/reversedVideo_sacdrv.mov'
    autoplay
    playbackRate=3
    muted
    videoHeight="full"
    width=100%
    bind:this={bgVideo}
    ></video>
  </div>
  <div class="container mx-auto mt-40 mb-60">
    <Carousel  />
  </div>


<section class = "w-full bg-sky-800 h-full py-40 ">
  <div id="login" class="mx-auto w-min flex bg-gray-100 p-4 rounded-xl content-center ">
    <!--TODO JWT AUTH-->
    <!-- <form on:submit|preventDefault class=" flex flex-col w-80 border-sky-900 border p-5 rounded-xl ">
      <label for="username">Username: </label>
      <input id="username" type="text" bind:value={login.username} >
      <label for="password">Password: </label>
      <input id="password" type="password" bind:value={login.password}>
      <input type="submit" value="Login" class= "orange-btn w-28 self-center mt-3">
    </form>
    <div class="h-min self-center mx-4">or</div> -->
    <a rel="external" href="/login" class="h-min self-center">
      <button class="gray-btn w-56 flex justify-between hover:text-cyan-200 shadow shadow-slate-800"><span class="self-center">Login using Github</span> <span class="h-8"><FaGithubAlt/></span></button>
    </a>  
  </div>
</section>

  
  <footer class = "py-8 text-white bg-red-700 pl-20">
    <p>by Craig McGowan</p>
    <p>craigmcgowandev@gmail.com</p>
  </footer>
</main>
