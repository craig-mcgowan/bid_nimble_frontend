<script>
  import FormField from "$lib/form-field.svelte";
  import Form from "$lib/form.svelte";  
  import { element } from "svelte/internal";
  import { trades } from "../../../stores/scopeStore";
  console.log($trades)

  const createScopeItem = (section) => {
    console.log('section:', section)
    section.scopeItems = [...section.scopeItems, {item: "", unit: "EACH", rate: "0"  }]
    console.log('section:', section)
    trades.set($trades)
  }

  const deleteScopeItem= (section, scopeItem) => {
    console.log('scopeItems:', section.scopeItems)
    console.log('item:', scopeItem)
    section.scopeItems = section.scopeItems.filter(item => item.item != scopeItem.item )
    console.log(section.scopeItems)
    trades.set($trades)
  }

</script>
<h1 class = "text-3xl">Takeoff</h1>
<table class = "table-auto  ">
  <thead class= "text-lg ">
    <tr>
      <th>Scope Item</th>
      <th>Unit</th>
      <th>Value</th>
    </tr>
  </thead>
<tbody>
  {#each $trades as trade, i}
    <tr class= " font-bold bg-blue-200 pl-2 ">
      <td colspan="2">{trade.name}</td>
      <td colspan="2" >
        <div class= "flex justify-end">
          <label class = "align-baseline text-xs font-thin pt-1 mr-2 " for="laborRate">Labor Rate: $</label>
          <input id="laborRate"  class="w-14 bg-opacity-50 rounded text-right bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" value = {trade.laborRate}>
        </div>
      </td>
    </tr>
  {#each trade.scopeSections as scopeSection, i }
    <tr class= "bg-blue-50 font-medium text-gray-600 ">
      <td class="pl-2">
        {scopeSection.name}
      </td>
    </tr>
  {#each scopeSection.scopeItems as scopeItem }
    <tr>
      <td><input type="text" placeholder="Item Description" class="border border-black shadow-lg rounded" value={scopeItem.item}/></td>
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
        <!--todo bind value to time value times hourly rate -->
        <span> $</span><input type="text" class="border border-black shadow-lg rounded" value={scopeItem.rate.toLocaleString()}/>
      </td>
      <td class = "align-top "><button on:click={()=>deleteScopeItem(scopeSection, scopeItem)} class=" red-btn inline-block align-top px-0 pt-0 pb-[3px] w-6 border-none ">x</button></td>
    </tr>
  {/each}
    <tr>
      <button class="font-bold  purple-btn ml-3 py-0" on:click={()=>createScopeItem(scopeSection)} >+</button>
    </tr>
  {/each}
  {/each}
</tbody>
</table>