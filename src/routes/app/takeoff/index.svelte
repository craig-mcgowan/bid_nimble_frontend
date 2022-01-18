<script>
  import Table from "$lib/table.svelte";
  import TradeSelector from "$lib/trade-selector.svelte";
  import { trades, fetchTrades } from "../../../stores/scopeStore";
  
  const updateTrades = async() => {
    
    console.log($trades)
    //iterate over stored array of trades
    $trades.forEach(async (trade) => {
      console.log(trade)
      const results = fetch(`https://bidnimble-api.herokuapp.com/trade/${trade._id}`,{
        method: 'put',
        body: JSON.stringify(trade)
      })
      const data = await results
      console.log(data)
      await fetchTrades()
    }); 

  }

</script>
<div class= "container flex ">
  <TradeSelector/>
  <div class=" w-10/12 pl-4">
    <Table />
  </div>
  <button  on:click= {()=>updateTrades() } class = "absolute right-4 top-32 purple-btn">Save</button>
  <button class = "absolute right-4 top-44 purple-btn">New Trade</button>
  <button class = "absolute right-4 top-56 purple-btn">New Scope Section</button>
  
</div>