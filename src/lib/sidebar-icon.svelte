<script>
  export let icon, tip
</script>
<div class = "sidebar-icon group">
  <svelte:component this={icon}/>
  <span class ="sidebar-tooltip group-hover:scale-100">
    {tip}
  </span>
  
</div>