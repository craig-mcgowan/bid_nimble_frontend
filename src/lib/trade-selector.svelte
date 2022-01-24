<script>
  import FaBuilding from "svelte-icons/fa/FaBuilding.svelte";
import FaLongArrowAltLeft from "svelte-icons/fa/FaLongArrowAltLeft.svelte";
import { trades, tradeNames, visibleTrades, isChecked, newTrades } from "../stores/scopeStore"  
import CandleLogo from "./candle-logo.svelte";

  let selectedTrades = new Set();

  const newTrade = {
    name: '',
    scopeSections: [{name:"", scopeItems: [{item: "", unit:"", rate:""}]}],
    userId: 1,
    laborRate: ''
  };

  const setVisibleTrades = (selection)=>{
    visibleTrades.set(Array.from(selection))
  }

  $: setVisibleTrades(selectedTrades)
  $: if (!$visibleTrades.length) { 
    selectedTrades.clear()
    }

  $: console.log($isChecked)
  
  const onCheckTrade = event => {
    if (event.target.checked) {
      selectedTrades.add(event.target.value);
    } else {
      selectedTrades.delete(event.target.value);
    }
    selectedTrades = selectedTrades;
    console.log(selectedTrades)
  };
  
  const onSelectAll = event => {
    if (event.target.checked) {
      selectedTrades = new Set($tradeNames);
      isChecked.set(true)
    } else {
      selectedTrades.clear();
      isChecked.set(false)
    }
    selectedTrades = selectedTrades;
    console.log(selectedTrades)
  };

  const handleNewTrade = () => {
    newTrades.set([...$newTrades, {
    name: '',
    scopeSections: [{name:"", scopeItems: [{item: "", unit:"", rate:""}]}],
    userId: 1,
    laborRate: ''
  }])
    console.log($newTrades)
  }
  
</script>

<div class= "container h-full w-80 border-sky-600 bg-neutral-100 border-2 rounded shadow p-3 shadow-zinc-800"> 
  <h2 class="mb-5  tracking-wide text-center text-2xl  ">Trades</h2>
  <button class = "green-btn" on:click={()=>handleNewTrade()}>New Trade</button>
  <div class="mt-5 container mx-auto h-11/12 w-full bg-white ring-1  rounded p-2 hover:overflow-auto">
    <label class="" >
      <input type="checkbox" checked={$isChecked} on:change={onSelectAll} name="select-all" class="peer mb-3">
      <span class="isCpeer-checked:font-bold mb-">
        Select All
      </span>
    </label>
    {#each $trades as trade}
    <label  class=" cursor-pointer  w-72">
      <input type="checkbox"  value={trade.name} checked={selectedTrades.has(trade.name)} on:change={onCheckTrade} class="peer hidden" >
      <div class="pl-1  text-slate-400 hover:bg-sky-700 rounded hover:text-white  mt-1 peer-checked:text-sky-800 peer-checked:font-bold peer-checked:hover:bg-slate-100 peer-checked:hover:font-normal peer-checked:hover:text-slate-500 ">
        {trade.name}
      </div>
    </label>
    {/each}
  </div>
  </div>