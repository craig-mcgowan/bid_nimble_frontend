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

  const updateEstimate = async(estimate) => {
    const sendEstimate = JSON.stringify(estimate)
    const res = await fetch(`${dbURL}/estimate/${estimate._id}`, {
      "method": "put",
      "headers": {"Content-Type": "application/json"},
      "body": sendEstimate,
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

  const handleEstimateUpdate = () => {
    updateEstimate()
    fetchTrades()
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
    <EstimateTable {updateEstimate} {dbURL} />
  </div>
  <button  on:click= {()=> handleEstimateUpdate() } class = "absolute right-4 top-32 purple-btn">Save</button>
    
</div>


{/if}