<script>
  export let icon, tip

</script>
<div class = "sidebar-icon group" on:click>
  <svelte:component this={icon} on:click/>
  <span class ="sidebar-tooltip group-hover:scale-100">
    {tip}
  </span>
  
</div>