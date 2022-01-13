<script>
  export let icon, tip

</script>
<div class = "sidebar-icon group">
  <div class = " group h-10 flex-grow-0 my-2  p-2 rounded-2xl min-w-fit duration-200 ease-linear transition-all" on:click>
    <svelte:component this={icon} on:click/>
  </div>
  <div class ="inline-block ml-1 overflow-hidden font-bold whitespace-nowrap text-orange-100 group-hover:text-white text-sm ">
    {tip}
  </div>
</div>