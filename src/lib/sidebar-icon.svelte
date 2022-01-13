<script>
  export let icon, tip

</script>
<div class = "sidebar-icon group">
  <div class = "group h-10 flex-grow-0 my-2 mx-1 bg-gray-500 text-orange-400 p-2 rounded-2xl group-hover:text-white group-hover:bg-orange-400  duration-200 ease-linear transition-all" on:click>
    <svelte:component this={icon} on:click/>
  </div>
  <div class =" inline-block w-0 overflow-hidden whitespace-nowrap group-hover:scale-100">
    {tip}
  </div>
</div>