<script>
  export let icon, tip, clickFunction
</script>
<div class = "sidebar-icon group" on:click={clickFunction}>
  <svelte:component this={icon}/>
  <span class ="sidebar-tooltip group-hover:scale-100">
    {tip}
  </span>
  
</div>