<script>
  import SidebarIcon from "./sidebar-icon.svelte"
  import NewEstimateForm from "./newEstimateForm.svelte";
  import FaBuilding from 'svelte-icons/fa/FaBuilding.svelte'
  import MdFlightTakeoff from 'svelte-icons/md/MdFlightTakeoff.svelte'
  import FaMoon from 'svelte-icons/fa/FaMoon.svelte'
  import FaQuestion from 'svelte-icons/fa/FaQuestion.svelte'
  import MdWbSunny from 'svelte-icons/md/MdWbSunny.svelte'
  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
  
  export let dark
  let togglerIcon = FaMoon
  let togglerTip = "Use Dark Mode"

  $: iconsArr = [ 
    {id:"takeoff", icon: MdFlightTakeoff , tip: "Takeoff Sheet"},
    {id:"estimates", icon: FaBuilding, tip: "Your Estimates" },
    {id:"help", icon: FaQuestion, tip: "Help" },
    {id: "toggler", icon: togglerIcon, tip: togglerTip}
  ] 

  const toggleDarkMode = () => {
    dark=!dark
    console.log('dark:', dark)
    if (dark) {
      togglerIcon = MdWbSunny
      togglerTip = "Use Light Mode"
    } else {
      togglerIcon = FaMoon
      togglerTip = "Use Dark Mode"
    }
    
  }

  const clickHandler= (id) => {
    if (id === "estimates/new") {

    } else {
      goto(`/app/${id}`)
    }
  }
let open = false
</script>


<div class="fixed top-0 left-0 z-10 h-screen w-16 bg-white bg-opacity-70 dark:bg-gray-600 dark:bg-opacity-50 shadow-md pt-20 hover:w-48 hover:shadow-lg transition-[width] delay-300">
  <div class = " h-screen justify-start content-start">
    {#each iconsArr as {icon, tip, id} (id)}
    {#if id === "toggler"}
    <SidebarIcon {icon} {tip} {id} on:click = {toggleDarkMode}
    /> 
    {:else}
    <SidebarIcon {icon} {tip} {id} on:click = {() => clickHandler(id)}/>

    {/if}
    
    {/each}
</div>


</div>