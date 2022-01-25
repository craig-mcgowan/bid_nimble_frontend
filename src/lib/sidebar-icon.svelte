<script>
  export let icon, tip, id
  import { page } from "$app/stores";

  let active
  $: active = $page.path.endsWith(id)

</script>
<div class:active on:click class = "sidebar-icon group last:pt-2.5 last:ml-0">
  <div class = " group h-10 flex-grow-0 my-2  p-2 rounded-2xl min-w-fit duration-200 ease-linear transition-all " on:click>
    <svelte:component this={icon} on:click/>
  </div>
  <div on:click  class ="inline-block ml-1 overflow-hidden font-bold whitespace-nowrap text-orange-100 group-hover:text-white text-sm ">
    {tip}
  </div>
</div>

<style>
  .active {
    @apply ring-[3px] ring-orange-300 shadow-slate-900 shadow-md
  }
</style>