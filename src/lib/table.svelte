<script>
  import FormField from "$lib/form-field.svelte";
  import Form from "$lib/form.svelte";  
  import { element } from "svelte/internal";
  import { trades, visibleTrades, fetchTrades } from "../stores/scopeStore";
  import CandleLogo from "./candle-logo.svelte";
  import FaLongArrowAltLeft from "svelte-icons/fa/FaLongArrowAltLeft.svelte"
  export let updateTrade
  
  
  console.log(updateTrade)

  const createScopeItem = (section) => {
    //console.log('section:', section)
    section.scopeItems = [...section.scopeItems, {item: "", unit: "EACH", rate: 0  }]
    //console.log('section:', section)
    trades.set($trades)
  }

  const deleteScopeItem= ( section, scopeItem, trade) => {
    //console.log('scopeItems:', section.scopeItems)
    //console.log('item:', scopeItem)
    section.scopeItems = section.scopeItems.filter(item => item.item != scopeItem.item )
    updateTrade(trade)
    fetchTrades()
    trades.set($trades)
  }

</script>

{#if $visibleTrades.length}
<div class = "w-11/12 bg-neutral-100 border-sky-600 border-2 rounded-md shadow-zinc-900 shadow-md rounded-t-md p-3">

    {#each $trades as trade, i}
    <div class= {`grid gap-y-1 bg-white rounded my-1 p-2 grid-cols-8 ${$visibleTrades.includes(trade.name)? "": "hidden"}`}>
      <div class= " col-span-8  py-1 font-bold pl-2 flex justify-between">
        <span>{trade.name}</span>
        <span >
          <div class= "flex justify-end">
            <label class = "align-baseline text-xs font-thin pt-1 mr-2 " for="laborRate">Labor Rate: $</label>
            <input id="laborRate"  class="w-14 bg-opacity-50 rounded text-right bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" bind:value = {trade.laborRate}>
          </div>
        </span>
      </div>
      {#each trade.scopeSections as scopeSection, i }
      <div class= "bg-blue-50 col-span-8 my-1 font-medium text-gray-600 ">
        <div  class=" pl-2">
          {scopeSection.name}
        </div>
      </div>
      {#each scopeSection.scopeItems as scopeItem }
        <div class="ml-2 peer col-span-5">
          <input type="text" placeholder="Item Description" class="border w-11/12 border-black shadow-lg rounded pl-2" bind:value={scopeItem.item}/>
        </div>
        <div class = "peer">
          <select name= "unit" placeholder="unit" bind:value={scopeItem.unit} class= "border border-black rounded">
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
        </div>
        <div class= "flex justify-between">
          <!--todo bind value to time value times hourly rate -->
          <span> $<input type="text" class=" w-20 ml-1 border border-black shadow-lg rounded" bind:value={scopeItem.rate}/></span>
        </div>
        <div class = " align-top flex justify-end ">
          <button on:click={()=>deleteScopeItem(scopeSection, scopeItem, trade)} class=" text-red-200 inline-block align-top px-0 pt-0 pb-[3px] w-6 hover:text-red-600 ">x</button>
        </div>
      
      {/each}
      <div class="">
        <button class="font-bold  purple-btn ml-3 py-0" on:click={()=>createScopeItem(scopeSection)} >+</button>
      </div>
      {/each}
    </div>
    {/each}
</div>
{:else}
  <div class = " text-sky-300 mt-36 mr-80"> 
      <h2 class = "animate-bounce text-center text-4xl">
        You don't have any trades selected
      </h2>
      <h3 class="text-3xl mt-20 text-orange-200 ">Select Trades Here</h3>
      <div class="aspect-square h-24 text-orange-200">
        <FaLongArrowAltLeft/>
      </div>

    
  </div>

{/if}

