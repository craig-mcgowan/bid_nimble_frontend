<script>
  import Table from "$lib/table.svelte";
  import TradeSelector from "$lib/trade-selector.svelte";
  import { trades, newTrades, fetchTrades, visibleTrades, isChecked } from "../../../stores/scopeStore";
  const dbURL = "https://bidnimble-api.herokuapp.com"
  import {session} from "$app/stores"

  visibleTrades.set([])
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

  const createTrade = async(trade) => {
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
    $newTrades.forEach(trade => createTrade(trade))
    $trades.forEach(trade =>updateTrade(trade))
    fetchTrades()
    isChecked.set(false)
    visibleTrades.set([])
    newTrades.set([])
  }

</script>
<div class= "container flex ">
  <TradeSelector/>
  <div class=" w-10/12 pl-4">
    <Table {updateTrade} {dbURL} />
  </div>
  <button  on:click= {()=> handleTradeUpdate() } class = "absolute right-4 top-32 purple-btn">Save</button>

  
  
</div>