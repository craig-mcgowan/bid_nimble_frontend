<script context="module">
  export async function load({ page: {params: {id}} }) {
    console.log(id)
    const URL = `https://bidnimble-api.herokuapp.com/estimate/${id}`;
    const res = await fetch(URL,{
      headers: {

      }
    });
   
   if (res.ok) {
     return {
       props: {
          estimate: await res.json()
       }
     };
   }
   
   return {
     status: res.status,
       error: new Error(`Could not load url`)
     };
   }
</script>
<script>
  import TradeSelector from "$lib/trade-selector.svelte";
  import EstimateTable from "$lib/estimateTable.svelte";
  import { onMount } from "svelte";
  import { currentEstimate, estimateData, fetchEstimate} from "../../../stores/estimateStore";
  import { visibleTrades } from "../../../stores/scopeStore";
  import { page } from "$app/stores";
import EstimateDetails from "$lib/estimateDetails.svelte";
  export let estimate



  console.log($page)
  fetchEstimate($page.params.id) 
  estimateData.set(estimate)
  currentEstimate.set(estimate)
  if ($currentEstimate.trades){
    visibleTrades.set($currentEstimate.trades.map(trade=> trade.name))
  }

  console.log($visibleTrades)

  console.log($currentEstimate)
  

  
  console.log("estimateData: ",$estimateData)
  console.log("currentEstimate: ",$currentEstimate)
  
  const updateEstimate = async(estimate) => {
    const res= await fetch(
    `https://bidnimble-api.herokuapp.com/estimate/${estimate._id}`, 
    {method: "put",
      "headers": {"Content-Type": "application/json"},
      "body": JSON.stringify(estimate)
    })
    const response = await res.json()
    currentEstimate.set(response)
    estimateData.set($currentEstimate)
    console.log(response)
    //fetchEstimate($currentEstimate._id)

  }


</script>

<div class= " grid grid-cols-11 mx-auto h-full">
  <div class="col-span-2">
    <TradeSelector  {updateEstimate} estimatePage=true />
  </div>
  <div class="col-span-6 pl-4">
    <EstimateTable {fetchEstimate} {updateEstimate} />
  </div>
  <div class=" bg-neutral-100 dark:bg-slate-500 border-sky-600 border-2 rounded-md shadow-zinc-900 shadow-md col-span-2 ml-4 h-min mt-5 ">
    <EstimateDetails {updateEstimate} />
  </div>
    
</div>
<style>

</style>