<script>
  export let icon, tip, id
  import { page } from "$app/stores";

  let last = id === "toggler"

  let active
  $: active = $page.path.endsWith(id)

</script>
<div class:active class:last on:click class = "sidebar-icon group ">
  <div class = " group h-10 flex-grow-0 my-2  p-2 rounded-2xl min-w-fit duration-200 ease-linear transition-all " >
    <svelte:component this={icon} />
  </div>
  <div  class ="inline-block ml-2 overflow-hidden font-bold whitespace-nowrap text-orange-100 group-hover:text-white text-sm ">
    {tip}
  </div>

</div>

<style>
  .active {
    @apply ring-[3px] ring-orange-300 shadow-slate-900 shadow-md
  }
  
  .last {
    @apply fixed bottom-4 left-3.5 h-8 w-8 text-green-400 hover:bg-green-400 pt-2.5 ml-0
  }

</style>