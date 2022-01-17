<script>
  import FormField from "$lib/form-field.svelte";
  import Form from "$lib/form.svelte";  
import { each } from "svelte/internal";
  import { trades } from "../../../stores/scopeStore";
  console.log($trades)

</script>
<h1>Takeoff</h1>
<table class = "table-fixed">
  <thead>
    <tr>
      <th>Scope Item</th>
      <th>Unit</th>
      <th>Value</th>
    </tr>
  </thead>
<tbody>
  {#each $trades as trade}
    <tr>{trade.name}</tr>
  {#each trade.scopeSections as scopeSection}
    <tr>{scopeSection.name}</tr>
  {#each scopeSection.scopeItems as scopeItem }
    <tr>
      <td><input type="text" class="border border-black shadow-lg" value={scopeItem.item}/></td>
      <td><FormField type="datalist" value={scopeItem.unit}/></td>
      <td><FormField value={`$ ${scopeItem.rate.toLocaleString()}`}/></td>
    </tr>
  {/each}
  {/each}
  {/each}
</tbody>
</table>