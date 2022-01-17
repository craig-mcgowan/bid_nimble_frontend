<script>
  import FormField from "$lib/form-field.svelte";
  import Form from "$lib/form.svelte";  
import { dataset_dev, each } from "svelte/internal";
  import { trades } from "../../../stores/scopeStore";
  console.log($trades)

</script>
<h1 class = "text-3xl">Takeoff</h1>
<table class = "table-fixed">
  <thead class= "text-lg border-black border">
    <tr>
      <th>Scope Item</th>
      <th>Unit</th>
      <th>Value</th>
    </tr>
  </thead>
<tbody>
  {#each $trades as trade}
    <tr class= " font-bold bg-blue-200 pl-2 border-black border">
      <td colspan="2">{trade.name}</td>
      <td>
        <label class = " text-xs font-thin  " for="laborRate">Labor Rate: $</label>
        <input id="laborRate" type="text" value = {trade.laborRate}>
      </td>
    </tr>
  {#each trade.scopeSections as scopeSection}
    <tr class= "bg-blue-50 font-medium text-gray-600 ">
      <td class="pl-2">
        {scopeSection.name}
      </td>
    </tr>
  {#each scopeSection.scopeItems as scopeItem }
    <tr>
      <td><input type="text" class="border border-black shadow-lg rounded" value={scopeItem.item}/></td>
      <td>
        <select name= "unit" placeholder="unit" class= "border border-black rounded">
          <optgroup label="Time">
            <option value="HR">HR </option>
            <option value="DAY">DAY </option>
            <option value="WEEK">WEEK </option>
          </optgroup>
          <optgroup label="Footage">  
            <option value="LF">LF </option>
            <option value="SF">SF </option>
          </optgroup>
          <optgroup label="Quantity/Lump Sum">
            <option value="EACH">EACH </option>
            <option value="LS">LS </option>
          </optgroup>
        </select>
      </td>
      <td>
        <span> $</span><input type="text" class="border border-black shadow-lg rounded" value={scopeItem.rate.toLocaleString()}/>
      </td>
    </tr>
  {/each}
  {/each}
  {/each}
</tbody>
</table>