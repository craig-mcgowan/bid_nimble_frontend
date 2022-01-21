<script>
  import Table from "$lib/table.svelte";
  import TradeSelector from "$lib/trade-selector.svelte";
  import { trades, fetchTrades, visibleTrades, isChecked } from "../../../stores/scopeStore";
  //const dbURL = "https://bidnimble-api.herokuapp.com"
  const dbURL = "http://localhost:4000/"

  
  const updateTrade = async(trade) => {
    //console.log(trade)
    //iterate over stored array of trades
    const sendTrade = JSON.stringify(trade)
    //console.log(sendTrade)
    const res = await fetch(`${dbURL}/trade/${trade._id}`, {
      "method": "put",
      "headers": {"Content-Type": "application/json"},
      "body": sendTrade,
    })
    //console.log('res:', res)
  }

  const handleTradeUpdate = () => {
    $trades.forEach(trade =>updateTrade(trade))
    fetchTrades()
    isChecked.set(false)
    visibleTrades.set([])
  }

</script>
<div class= "container flex ">
  <TradeSelector/>
  <div class=" w-10/12 pl-4">
    <Table {updateTrade} />
  </div>
  <button  on:click= {()=> handleTradeUpdate() } class = "absolute right-4 top-32 purple-btn">Save</button>
  <button class = "absolute right-4 top-44 purple-btn">New Trade</button>
  <button class = "absolute right-4 top-56 purple-btn">New Scope Section</button>
  
</div>