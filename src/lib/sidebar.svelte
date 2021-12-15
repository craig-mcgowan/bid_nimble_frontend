<script>
  import SidebarIcon from "./sidebar-icon.svelte"
  import FaBuilding from 'svelte-icons/fa/FaBuilding.svelte'
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import MdFlightTakeoff from 'svelte-icons/md/MdFlightTakeoff.svelte'
  import FaMoon from 'svelte-icons/fa/FaMoon.svelte'
  import MdWbSunny from 'svelte-icons/md/MdWbSunny.svelte'
  export let dark

  let togglerIcon = FaMoon
  let togglerTip = "Use Dark Mode"

  $: iconsArr = [ 
    {id:1, icon: FaPlus, tip: "New Estimate"},
    {id:2, icon: MdFlightTakeoff , tip: "Takeoff Sheet"},
    {id:3, icon: FaBuilding, tip: "Your Estimates"},
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

  const clickHandler= (e) => {
    console.log(e.target)
  }

</script>


<div class="fixed top-0 left- h-screen w-16 shadow-md pt-20">
  <div class = "flex flex-col h-screen">
    {#each iconsArr as {icon, tip, id} (id)}
    {#if id === "toggler"}
    <SidebarIcon {icon} {tip} clickFunction = {toggleDarkMode}
    /> 
    {:else}
    <SidebarIcon {icon} {tip} clickFunction = {clickHandler}/>

    {/if}
    
    {/each}
  </div>


</div>