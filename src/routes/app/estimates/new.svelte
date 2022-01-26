<script>
  import EstimateTable from "$lib/estimateTable.svelte";
  import TradeSelector from "$lib/trade-selector.svelte";
  import { trades, newTrades, fetchTrades, visibleTrades, isChecked } from "../../../stores/scopeStore";
  const dbURL = "https://bidnimble-api.herokuapp.com"
  import {session} from "$app/stores"
  import Form from "$lib/form.svelte";
  

  let showEstimate = false
  let newEstimate = {
    name: "",
    location: "",
    trades: [],
    subtotal: "0",
    fees: [],
    total: "0"
  }


  console.log($session.user)

  const updateTrade = async(trade) => {
    const sendTrade = JSON.stringify(trade)
    const res = await fetch(`${dbURL}/trade/${trade._id}`, {
      "method": "put",
      "headers": {"Content-Type": "application/json"},
      "body": sendTrade,
    })
    console.log(res)
  }

  const createEstimate = async(estimate) => {
    const sendEstimate = JSON.stringify(estimate)
    console.log(sendEstimate)
    const res = await fetch(`${dbURL}/estimate`, {
      "method": "post",
      "headers": {"Content-Type": "application/json"},
      "body": sendEstimate,
    })
    console.log(res)
    showEstimate = true
    newEstimate = {
    name: "",
    location: "",
    trades: [],
    subtotal: "0",
    fees: [],
    total: "0"
    }
  }

  const handleTradeUpdate = () => {
    $newTrades.forEach(trade => createTrade(trade))
    $trades.forEach(trade =>updateTrade(trade))
    fetchTrades()
    isChecked.set(false)
    visibleTrades.set([])
    newTrades.set([])
  }

</script>
{#if !showEstimate}
<form on:submit|preventDefault={()=>createEstimate(newEstimate)}>
  <label for="name">Project Name: </label>
  <input type="text" bind:value={newEstimate.name} id="name" name="name">
  <label for="location">Project Address: </label>
  <input type="text" bind:value={newEstimate.location} id="location" location="location">
  <label for="name"> </label> 
  <input class="gray-btn" type="submit" value="Create Project">
</form>
{:else}
<div class= "container flex ">
  <TradeSelector newEstimate=true/>
  <div class=" w-10/12 pl-4">
    <EstimateTable {updateTrade} {dbURL} />
  </div>
  <button  on:click= {()=> handleTradeUpdate() } class = "absolute right-4 top-32 purple-btn">Save</button>
    
</div>


{/if}