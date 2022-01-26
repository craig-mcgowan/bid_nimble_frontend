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

  export let estimate

  console.log(estimate)
</script>

<div class= "container flex ">
  <TradeSelector newEstimate=true/>
  <div class=" w-10/12 pl-4">
    <EstimateTable />
  </div>
  <button  on:click= {()=> console.log('clicked') } class = "absolute right-4 top-32 purple-btn">Save</button>
    
</div>
<style>

</style>