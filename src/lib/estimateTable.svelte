<script>
  import FormField from "$lib/form-field.svelte";
  import Form from "$lib/form.svelte";  
  import ScopeItemDropdown from "./scopeItemDropdown.svelte";
  
  import TradeForm from "./tradeForm.svelte";
  import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte"
  import { element } from "svelte/internal";
  import { trades, newTrades, visibleTrades, fetchTrades } from "../stores/scopeStore";
  import {currentEstimate, estimateData, fetchEstimates} from "../stores/estimateStore"
  import CandleLogo from "./candle-logo.svelte";
  import FaLongArrowAltLeft from "svelte-icons/fa/FaLongArrowAltLeft.svelte"
  import FaEdit from "svelte-icons/fa/FaEdit.svelte";
  import {scale, fade, slide} from "svelte/transition"
  export let updateEstimate
   
  
  let closed = true
  const openHandler = (section) => {
    closed = section._id
  }
  
  function handleClickOutside(event) {
    closed = true
  }

  
  function clickOutside(node) {
    
    const handleClick = event => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('click_outside', node)
          )
        }
      }
      document.addEventListener('click', handleClick, true);
      return {
        destroy() {
          document.removeEventListener('click', handleClick, true);
        }
      }
    }
    
    $: console.log(closed)
    
    let showEstimate = false
    export let dbURL
    let editableTrade= false

    const sumTotals = () => {
      return $currentEstimate.trades
      .flatMap(trades=> trades.sections)
      .flatMap(trades=> trades.lineItems)
      .reduce((sum, item) => sum + Number(item.total),0)
      
    }

    $currentEstimate.total = sumTotals()
    
    const computeTotal= (param1, param2) => {
      let total = Number(param1) * Number(param2)
      return total? total.toString() : ""
    }
    
    
    const getTakeOffItems = (trade, section) =>{
      const thisTrade= $trades.find(ele=>ele.name===trade.name)
      
      const thisSection= thisTrade.scopeSections.find(ele=>ele.name===section.name)
      console.log(thisSection)
      return thisSection.scopeItems
    }
    
    const handleScopeSelection = ( trade, section, lineItem) => {
      let result = getTakeOffItems(trade, section).find(ele=> ele.item === lineItem.item)    
      if (result){
        lineItem.rate = result.rate
        lineItem.unit = result.unit
      }
      return lineItem
    }
    
    let rateOptions = [
      {
        category: "Time",
        options: ["HR",
        "DAY",
        "WEEK",]
      },   
      {category:"Footage" ,
      options: ["LF",
      "SF"]
    },
    {category:"Quantity/Lump Sum",
    options:["EACH",
    "LS"]
  }
]


const createScopeItem = (trade, section) => {
  const result = getTakeOffItems(trade, section)
  console.log(result)
  console.log($estimateData)
  $estimateData.trades
  .find(t=>t.name === trade.name)
  .sections
  .find(s => s.name === section.name)
  .lineItems
  .push({item: "", quantity:"",unit: "", rate: "", total: "" })
  
  console.log($estimateData)
  
  updateEstimate($estimateData)
  
}
const addLineItem = (trade, section, li) => {
  li.item = li.item === "New Blank Line Item"? "" : li.item
  li.quantity= "1"
  li.total = computeTotal(li.quantity, li.rate)
  $estimateData.trades
    .find(t=>t.name === trade.name)
    .sections
    .find(s => s.name === section.name)
    .lineItems
    .push(li)
  console.log($estimateData)
  
  updateEstimate($estimateData)
}

const deleteScopeItem= ( section, lineItem) => {
    
    section.lineItems = section.lineItems.filter(item => item._id != lineItem._id )
    updateEstimate($currentEstimate)
    borderRed=false

  }

  const deleteTrade = async(trade, newTrade = false) => {
    hovRed= false
    if (newTrade) {
      newTrades.set($newTrades.filter(item => item != trade))
    } else {
      const sendTrade = JSON.stringify(trade)
      
      const res = await fetch(`${dbURL}/trade/${trade._id}`, {
        "method": "delete",
        "headers": {"Content-Type": "application/json"},
        "body": sendTrade,
      })
      
      fetchTrades()
      
    }
  }

  let hovRed = false
  let borderRed = false
  let thisNewTrade


</script>
  
{#if $currentEstimate.trades.length}
<div class = "w-full bg-neutral-100 dark:bg-slate-500 border-sky-600 border-2 rounded-md shadow-zinc-900 shadow-md rounded-t-md">
  <!-- -----------------------------Existing Trades --------------------------------- -->
  {#each $currentEstimate.trades as trade (trade._id)}
  <div class= {`grid gap-y-1 bg-white dark:bg-slate-600 rounded my-1 p-2 grid-cols-9 ${$visibleTrades.includes(trade.name)? "": "hidden"}`} class:hovRed = {hovRed===trade._id}>
    <div class= " col-span-9  py-1 font-bold pl-2 flex justify-between">
      <span>
        <input id="trade"  class="border disabled:border-none border-black bg-white w-96  rounded focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" placeholder="Trade Name Here" bind:value = {trade.name} disabled>
      </span>
    </div>
    {#each trade.sections as section, i }
    <div class= "w-full col-span-9 ">
      <div class= "w-full bg-blue-50 grid grid-cols-9 my-1 font-medium text-gray-600 ">
        <div class="col-span-4 pl-2">
          <input id="section"  class="border border-blue-400 disabled:border-none  bg-opacity-50 rounded bg-blue-50 focus:bg-opacity-100 focus:bg-white mr-2 pr-1" type="text" placeholder="Scope Section Name Here" disabled={trade._id != editableTrade} bind:value = {section.name}>
        </div>
        <div class= "bg-blue-50 my-1 pl-2 col-span-1 text-gray-600 ">
          Quantity
        </div>
        <div class= "bg-blue-50 my-1 pl-2 col-span-1 text-gray-600 ">
          Unit
        </div>
        <div class= "bg-blue-50 my-1 pl-2 col-span-1 text-gray-600 ">
          Rate
        </div>
        <div class= "bg-blue-50 my-1 pl-2  col-span-2 text-gray-600 ">
          Line Item Total
        </div>
        
      </div>
    </div>
      
    
    {#each section.lineItems as lineItem }
      <div class="ml-2 col-span-4" >
        <input type="text" placeholder="Item Description" class:borderRed={borderRed===lineItem._id}
        class="border w-11/12 border-black shadow-lg bg-opacity-50 h-full rounded pl-2" bind:value={lineItem.item} 
        on:change={()=>{
          lineItem = handleScopeSelection(trade, section, lineItem)
          }} />

      </div>
      <div class="ml-2 col-span-1" >
        <input type="text" placeholder="Quantity" class:borderRed={borderRed===lineItem._id}
        class="border w-11/12 border-black shadow-lg bg-opacity-50 dark:bg-transparent h-full rounded pl-2" bind:value={lineItem.quantity} 
        on:input={()=> {
          lineItem.total = computeTotal(
            lineItem.quantity, lineItem.rate, lineItem)
          $currentEstimate.total= sumTotals()
          }}/>
      </div>
      <div >
        <select name= "unit" placeholder="unit" class:borderRed={borderRed===lineItem._id} value={lineItem.unit} class= "border border-black h-full rounded dark:bg-transparent">
          <option value={""} >--UNIT--</option>
          {#each rateOptions as {category, options}}
          <optgroup label={category}>
            {#each options as option }
              <option value={option}>{option}</option>
            {/each}
          </optgroup>
          {/each}
        </select>
      </div>
      <div class= "flex justify-between">

        <span> $<input type="text" class:borderRed={borderRed===lineItem._id} class=" w-20 ml-1 border border-black shadow-lg rounded" bind:value={lineItem.rate} on:input={()=> {
          lineItem.total = computeTotal(
            lineItem.quantity, lineItem.rate, lineItem)
          $currentEstimate.total= sumTotals()
          }}/>
          </span>
      </div>
      <div>
        <span> $<input type="text" class:borderRed={borderRed===lineItem._id} class=" w-20 ml-1 border border-black shadow-lg rounded" bind:value={lineItem.total}/></span>
      </div>
      <div class = " align-top flex justify-end " class:hovRed={hovRed===lineItem._id}>
      <button on:click={()=>deleteScopeItem(section, lineItem, trade)} class=" text-red-200 inline-block align-top px-0 pt-0 pb-[3px] w-6 hover:text-red-600 " on:mouseenter={()=>borderRed=lineItem._id} on:mouseleave={()=>borderRed=false}>x</button>
      </div>
    
    {/each}


    <!-----------------------NEW SCOPE ITEM BUTTON ---------------------->
    
    <div use:clickOutside on:click_outside={handleClickOutside} class="">
      <button class="font-bold disabled:bg-gray-200 disabled:border-gray-300 disabled:text-white  purple-btn ml-3 py-0" on:click={openHandler(section)} disabled={closed === section._id}>+</button>
      <span class:closed={closed != section._id} class = "border-slate-800 absolute -mt-2 ml-2 py-1 rounded border-2 shadow transition z-10 bg-white px-2">
        <ScopeItemDropdown {addLineItem} {trade} {section}/>
      </span>
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
  .closed {
    @apply hidden
  }
</style>
