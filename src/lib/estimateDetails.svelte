<script>
import { goto } from "$app/navigation";
import { currentEstimate } from "../stores/estimateStore";
export let updateEstimate

const handleSave = () => {
  updateEstimate($currentEstimate)
  goto("/app/estimates")
}

</script>
<div class="flex flex-col p-3" >
  <button on:click={handleSave} class="gray-btn ">Save Estimate</button>
  <label for="name">Project Name:</label>
  <input class = "text-field" id="name" type="text" bind:value={$currentEstimate.name}>
  <label for="location">Location:</label>
  <input class = "text-field" id="location" type="text" bind:value={$currentEstimate.location}>

  <span>Total:  $ {Number($currentEstimate.total).toLocaleString()}</span>
    

  
</div>



<style>

</style>