<script>
  import FormField from "$lib/form-field.svelte";
  import Form from "$lib/form.svelte";  
  import TradeForm from "./tradeForm.svelte";
  import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte"
  import { element } from "svelte/internal";
  import { trades, newTrades, visibleTrades, fetchTrades } from "../stores/scopeStore";
  import CandleLogo from "./candle-logo.svelte";
  import FaLongArrowAltLeft from "svelte-icons/fa/FaLongArrowAltLeft.svelte"
  import FaEdit from "svelte-icons/fa/FaEdit.svelte";
  import {scale, fade, slide} from "svelte/transition"

  export let updateTrade
  export let dbURL
  let editableTrade= false


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
    borderRed=false
    fetchTrades()
    trades.set($trades)

  }

  const deleteTrade = async(trade, newTrade = false) => {
    hovRed= false
    if (newTrade) {
      newTrades.set($newTrades.filter(item => item != trade))
    } else {
      const sendTrade = JSON.stringify(trade)
      console.log(sendTrade)
      const res = await fetch(`${dbURL}/trade/${trade._id}`, {
        "method": "delete",
        "headers": {"Content-Type": "application/json"},
        "body": sendTrade,
      })
      console.log(res)
      fetchTrades()
      
    }
  }

  let hovRed = false
  let borderRed = false
  let thisNewTrade



</script>



{#if $visibleTrades.length || $newTrades.length}
  <div class = "w-11/12 bg-neutral-100 border-sky-600 border-2 rounded-md shadow-zinc-900 shadow-md rounded-t-md p-3 dark:text-white dark:bg-slate-500">
    {#if $newTrades.length}
    <h1>New Trades</h1>
    {/if}
    {#each $newTrades as trade, i (trade.id)}
      <div in:slide out:fade class= "bg-white dark:bg-slate-600 grid gap-y-1  rounded my-1 p-2 grid-cols-8 group" class:hovRed={hovRed===trade.id}>
        <div class="col-span-8  py-1 font-bold pl-2 flex justify-between" >
          <span>
              <input id="trade"  class="w-96 bg-opacity-50 rounded bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" placeholder="Trade Name Here" bind:value = {trade.name}>
          </span>
          <span >
            <div class= "flex justify-end">
              <label class = "align-baseline text-xs font-thin pt-1 mr-2 " for="laborRate">Labor Rate: $</label>
              <input id="laborRate"  class="w-14 bg-opacity-50 rounded  bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" bind:value = {trade.laborRate}>
            </div>
          </span>
          <span>
            <button on:click={()=>deleteTrade(trade, true)} class=" text-red-200 inline-block align-top px-0 pt-0 pb-[3px] w-3 hover:text-white " on:mouseenter = {()=> hovRed=trade.id} on:mouseleave={()=>hovRed=false} ><FaTrashAlt/></button>
          </span>
        </div>
      {#each trade.scopeSections as scopeSection, i }
        <div class= "bg-blue-50 dark:bg-slate-800 col-span-8 my-1 font-medium text-gray-600 ">
          <input id="section"  class="w-96 bg-opacity-50 rounded bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" placeholder="Scope Section Name Here" bind:value = {scopeSection.name}>
        </div>
        {#each scopeSection.scopeItems as scopeItem, index }
          <div class="ml-2 col-span-5" >
          <input type="text" placeholder="Item Description" class:borderRed={borderRed===index && thisNewTrade ===trade.id}
        class="border w-11/12 border-black shadow-lg bg-opacity-50 h-full rounded pl-2" bind:value={scopeItem.item}/>
        </div>
        <div >
          <select name= "unit" placeholder="unit" class:borderRed={borderRed===index && thisNewTrade ===trade.id} bind:value={scopeItem.unit} class= "border dark:bg-transparent border-black h-full rounded">
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
          <span> $<input type="text" class:borderRed={borderRed===index && thisNewTrade ===trade.id} class=" w-20 ml-1 border border-black shadow-lg rounded" bind:value={scopeItem.rate}/></span>
        </div>
        <div class = " align-top flex justify-end " class:hovRed={hovRed===scopeItem._id}>
          <button on:click={()=>deleteScopeItem(scopeSection, scopeItem, trade)} class=" text-red-200 inline-block align-top px-0 pt-0 pb-[3px] w-6 hover:text-red-600 " on:mouseenter={()=>{
            borderRed=index
            thisNewTrade=trade.id
            }} on:mouseleave={()=>{
              borderRed=false
              thisNewTrade= null}}>x</button>
        </div>
        {/each}

        {/each}
      </div>
      {/each}
    {#if $newTrades.length && $visibleTrades.length }
      <div class="h-[2px] bg-black my-5 rounded-lg"></div>
    {/if}
    {#if $visibleTrades.length}
      <h3>My Trades</h3>      
    {/if}



    <!-- -----------------------------Existing Trades --------------------------------- -->

    {#each $trades as trade (trade._id)}
    <div in:slide out:fade class= {`grid gap-y-1 bg-white dark:bg-slate-600 rounded my-1 p-2 grid-cols-8 ${$visibleTrades.includes(trade.name)? "": "hidden"}`} class:hovRed = {hovRed===trade._id}>
      <div class= " col-span-8  py-1 font-bold pl-2 flex justify-between">
        <span>
          <input id="trade"  class="border disabled:border-none border-black bg-white w-96  rounded focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" placeholder="Trade Name Here" bind:value = {trade.name} disabled= {trade._id != editableTrade}>
          </span>
          <span >
            <div class= "flex justify-end">
              <label class = "align-baseline text-xs font-thin pt-1 mr-2 " for="laborRate">Labor Rate: $</label>
              <input id="laborRate"  class="w-14 bg-opacity-50 rounded text-right bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" bind:value = {trade.laborRate}>
            </div>
          </span>
          <span>
            <button on:click={()=> editableTrade = trade._id} class=" text-teal-300 hover:text-teal-900 inline-block align-top px-0 pt-0 pb-[3px] w-4 mr-2 "  ><FaEdit/></button>
            <button on:click={()=>deleteTrade(trade)} class=" text-red-200 inline-block align-top px-0 pt-0 pb-[3px] w-3 hover:text-white " on:mouseenter = {()=> hovRed= trade._id} on:mouseleave={()=>hovRed=false} ><FaTrashAlt/></button>
           </span>
      </div>
      {#each trade.scopeSections as scopeSection, i }
      <div class= "bg-blue-50 dark:bg-slate-800 col-span-8 my-1 font-medium text-gray-600 ">
        <div  class=" pl-2">
          <input id="section"  class="border border-blue-400 disabled:border-none w-96 bg-opacity-50 rounded bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" placeholder="Scope Section Name Here" disabled={trade._id != editableTrade} bind:value = {scopeSection.name}>
        </div>
      </div>
      {#each scopeSection.scopeItems as scopeItem }
        <div class="ml-2 col-span-5" >
          <input type="text" placeholder="Item Description" class:borderRed={borderRed===scopeItem._id}
        class="border w-11/12 border-black shadow-lg bg-opacity-50 h-full rounded pl-2" bind:value={scopeItem.item}/>
        </div>
        <div >
          <select name= "unit" placeholder="unit" class:borderRed={borderRed===scopeItem._id} bind:value={scopeItem.unit} class= "border border-black  dark:bg-transparent h-full rounded">
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
          <span> $<input type="text" class:borderRed={borderRed===scopeItem._id} class=" w-20 ml-1 border border-black shadow-lg rounded" bind:value={scopeItem.rate}/></span>
        </div>
        <div class = " align-top flex justify-end " class:hovRed={hovRed===scopeItem._id}>
          <button on:click={()=>deleteScopeItem(scopeSection, scopeItem, trade)} class=" text-red-200 inline-block align-top px-0 pt-0 pb-[3px] w-6 hover:text-red-600 " on:mouseenter={()=>borderRed=scopeItem._id} on:mouseleave={()=>borderRed=false}>x</button>
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

<style>
  .hovRed {
    @apply bg-red-400
  }
  .borderRed {
    @apply border-red-600 border-2
  }
</style>
