<script>
  import SidebarIcon from "./sidebar-icon.svelte"
  import FaBuilding from 'svelte-icons/fa/FaBuilding.svelte'
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
  import MdFlightTakeoff from 'svelte-icons/md/MdFlightTakeoff.svelte'

  const iconsArr = [ 
    {icon: FaPlus, tip: "New Estimate"},
    {icon: MdFlightTakeoff , tip: "Takeoff Sheet"},
    {icon: FaBuilding, tip: "Your Estimates"}
  ]

</script>


<div class="fixed top-0 left- h-screen w-16 shadow-md pt-20">
  <div class = "flex flex-col">
    {#each iconsArr as {icon, tip}}
    <SidebarIcon {icon} {tip}/>
    {/each}
  </div>

</div>