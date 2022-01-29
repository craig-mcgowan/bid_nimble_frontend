<script>
import FaBuilding from "svelte-icons/fa/FaBuilding.svelte";
import FaLongArrowAltLeft from "svelte-icons/fa/FaLongArrowAltLeft.svelte";
import { trades, tradeNames, visibleTrades, isChecked, newTrades, newTradeKey } from "../stores/scopeStore"  
import {estimateData} from "../stores/estimateStore"
import CandleLogo from "./candle-logo.svelte";

export let updateEstimate
export let estimatePage = false

const nullLineItem =
  	{
					item: '',
					unit: '',
					rate: '',
					quantity: '',
					fluff: '',
					total: ''
				}

const	nullSection =
		{
			name: '',
			lineItems: [nullLineItem]
		}
	;
const nullTrade = {
	name: '',
  total: '',
  sections:[]
};


let selectedTrades = new Set($visibleTrades);

const addTradeToEstimate = (addedTrade) => {
  const newTrade = {
    name: '',
    total: '',
    sections:[]
  }
  console.log("newTrade=",newTrade)
  console.log("addedTrade = ", addedTrade)
  newTrade.name = addedTrade
  // console.log('trades:', $trades)
  $trades.find(trade => trade.name===addedTrade)
    .scopeSections
    .forEach( (section, i)=>{
      newTrade.sections = [...newTrade.sections, 
        {name: '',
			    lineItems: [ {
					item: '',
					unit: '',
					rate: '',
					quantity: '',
					fluff: '',
					total: ''
				}]
      }
    ]
      newTrade.sections[i].name= section.name
    }
  )
  console.log(newTrade)

  
  $estimateData.trades.push(newTrade)
  updateEstimate($estimateData)
}

const removeTradeFromEstimate = (removedTrade) => {
  $estimateData.trades = $estimateData.trades.filter(trade => trade.name != removedTrade)
  updateEstimate($estimateData)
}

  const setVisibleTrades = (selection)=>{
    visibleTrades.set(Array.from(selection))
  }

  $: setVisibleTrades(selectedTrades)
  $: if (!$visibleTrades.length) { 
    selectedTrades.clear()
    }

  // $: console.log($isChecked)
  
  const onCheckTrade = event => {
    if (event.target.checked) {
      selectedTrades.add(event.target.value);
      if (estimatePage ) {
        addTradeToEstimate(event.target.value)
      }
    } else {
      selectedTrades.delete(event.target.value);
      if (estimatePage) {
        removeTradeFromEstimate(event.target.value)
      }
    }
    selectedTrades = selectedTrades;
    // console.log(selectedTrades)
    // console.log("visibleTrades: ", $visibleTrades)
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
    // console.log(selectedTrades)
  };

  const handleNewTrade = () => {
    newTradeKey.update(n => n+1 )
    newTrades.set([...$newTrades, {
    name: '',
    scopeSections: [{name:"", scopeItems: [{item: "", unit:"", rate:""}]}],
    userId: 1,
    laborRate: '',
    id: $newTradeKey
  }])
    // console.log($newTrades)
  }
  
</script>

<div class= "container h-full w-full border-sky-600 bg-neutral-100 dark:bg-slate-500 border-2 rounded shadow p-3 shadow-zinc-800"> 
  <h2 class="mb-5  tracking-wide text-center text-2xl  ">Trades</h2>
  {#if !estimatePage }
  <button class = "green-btn" on:click={()=>handleNewTrade()}>New Trade</button>
  {/if}
  <div class="mt-5 container mx-auto h-11/12 w-full bg-white dark:bg-slate-400 ring-1  rounded p-2 hover:overflow-auto">
    {#if !estimatePage}
    <label class="" >
      <input type="checkbox" checked={$isChecked} on:change={onSelectAll} name="select-all" class="peer mb-3">
      <span class="isCpeer-checked:font-bold mb-">
        Select All
      </span>
    </label>
    {/if}
    {#each $trades as trade}
    <label  class=" cursor-pointer  w-72">
      <input type="checkbox"  value={trade.name} checked={selectedTrades.has(trade.name)} on:change={onCheckTrade} class="peer hidden" >
      <div class="pl-1  text-slate-400 dark:text-white hover:bg-sky-700 rounded hover:text-white  mt-1 peer-checked:text-sky-800 peer-checked:font-bold peer-checked:hover:bg-slate-100 peer-checked:hover:font-normal peer-checked:hover:text-slate-500 ">
        {trade.name}
      </div>
    </label>
    {:else}
      <p>No trades yet, start by clicking the new trade button.</p>
    {/each}
  </div>
  </div>