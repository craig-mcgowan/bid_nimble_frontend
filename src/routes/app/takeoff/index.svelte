<script>
  import { scopeItems } from "../../../stores/scopeStore";
  console.log($scopeItems)
</script>
<h1>Takeoff</h1>
{#each $scopeItems as scopeItem}
<div class = "border-2 border-black rounded-md">
  <p>{scopeItem.scopeItem}</p>
  <p>{scopeItem.tradeName}</p>
</div>  
  
{/each}