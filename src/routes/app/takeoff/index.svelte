<script>
  import Table from "$lib/table.svelte";
  import TradeSelector from "$lib/trade-selector.svelte";
  import { trades, newTrades, fetchTrades, visibleTrades, isChecked } from "../../../stores/scopeStore";
  const dbURL = "https://bidnimble-api.herokuapp.com"
  import {session} from "$app/stores"

  //upon page load, set the visible trades to an empty array (unchecks everything)
  visibleTrades.set([])

  //sends a put request to the api to update the trade
  const updateTrade = async(trade) => {
    const sendTrade = JSON.stringify(trade)
    const res = await fetch(`${dbURL}/trade/${trade._id}`, {
      "method": "put",
      "headers": {"Content-Type": "application/json"},
      "body": sendTrade,
    })
    console.log(res)
  }
  
  
  const createTrade = async(trade) => {
    //deletes the trade ID initially assigned in order to key the each block
    //mongo will give it it's own unique ID
    delete trade.id
    const sendTrade = JSON.stringify(trade)
    console.log(sendTrade)
    const res = await fetch(`${dbURL}/trade`, {
      "method": "post",
      "headers": {"Content-Type": "application/json"},
      "body": sendTrade,
    })
    console.log(res)
  }


  const handleTradeUpdate = () => {
    //loops through all the new trades and creates them
    $newTrades.forEach(trade => createTrade(trade))
    //loops through the existing trades and updates them
    $trades.forEach(trade =>updateTrade(trade))
    //calls the API to update the store
    fetchTrades()
    //uncheck everything to reset the page. Intended to give feedback the their save worked
    isChecked.set(false)
    visibleTrades.set([])
    newTrades.set([])
  }

</script>
<div class= "container flex ">
  <div class="w-1/6 container">
    <TradeSelector/>
  </div>
  <div class="container w-10/12 pl-4">
    <Table {updateTrade} {dbURL} />
  </div>
  <button  on:click= {()=> handleTradeUpdate() } class = "absolute right-4 top-32 purple-btn">Save</button>

  
  
</div>