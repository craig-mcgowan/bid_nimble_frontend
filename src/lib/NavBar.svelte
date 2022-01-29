<script>
  import CandleLogo from "./candle-logo.svelte";
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import NewEstimateForm from "./newEstimateForm.svelte";
  import { goto } from '$app/navigation';
  import SidebarIcon from "./sidebar-icon.svelte";
  import {slide, fade} from "svelte/transition"
  

  let closed = true
  const openHandler = () => {
    closed = false

  }

  function handleClickOutside(event) {
    closed = true
  }

 function clickOutside(node) {
  
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('click_outside', node)
      )
    }
  }

	document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
	}
}
</script>



<nav class = "shadow-lg z-20 flex justify-between px-7 fixed top-0 left-0 w-screen bg-white dark:bg-gray-700 dark:shadow-gray-800 dark:shadow-md" >
  
  <div on:click={() => goto("/app/estimates")} class="flex justify-between content-center group">
    <CandleLogo />
    <h1 class = "align-middle self-center font-logo text-5xl text-gray-500 group-hover:text-indigo-500 dark:text-yellow-200 cursor-pointer transition-nonem dark:group-hover:text-yellow-400">bid<span class="font-logo2 text-5xl">Nimble</span></h1>
  </div>
  <div use:clickOutside on:click_outside={handleClickOutside} class= "login flex justify-between w-96 content-center"> 
        <div class = "h-12 flex flex-col basis self-center justify-center">
        <div class ="self-center w-48 peer">
          <button class:clicked={!closed} class="self-center py-1 px-4 text-white bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-300 hover:to-slate-400 rounded-xl shadow hover:scale-105" on:click={openHandler} >
            New Estimate
          </button>
          <div class:closed transition:fade class = "fixed top-14 right-40 z-20 w-72 px-2 py-4 m-2 rounded-md shadow-md text-xs font-bold duration-200  origin-top text-slate-800 bg-white peer border-sky-800 border-2">
            <NewEstimateForm {closed}/>
          </div>
        </div>
      </div>
      <a class = "h-min self-center" rel="external" href="/logout"> 
        <button on:click={() => goto("/")} class=' w-28 h-8 text-white bg-gradient-to-br from-green-300 to-green-400 shadow hover:from-green-300 hover:to-green-300 hover:scale-105 rounded-xl'>Logout</button>
      </a>
    </div> 
</nav>

<style>
  .closed {
    @apply hidden 
  }
  .clicked {
    @apply border-2 border-slate-800
  }
</style>