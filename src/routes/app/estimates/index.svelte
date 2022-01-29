<script context="module">
	
  export async function load({ page }) {
    const res = await fetch(`https://bidnimble-api.herokuapp.com/estimate`, {
		method: 'get',
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
  
  if (res.ok) {
    return {
      props: {
         allEstimates: await res.json()
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
  export let allEstimates
  import ProjectCard from "$lib/projectCard.svelte";
  import { fetchEstimates, estimates } from "../../../stores/estimateStore";
  
  const getEstimates = async() => {
    $estimates.set(allEstimates)
  }
  const deleteEstimate = async(estimate) => {
        const res = await fetch(`https://bidnimble-api.herokuapp.com/estimate/${estimate._id}`, {
        "method": "delete",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(estimate)
      })
      await fetchEstimates()
  }
</script>

<div class = "container ml=10 h-full">
  <h2 class= "ml-28 text-4xl font-bold">My Estimates</h2>
  {#await getEstimates }
    <p>loading</p>
  {:then name }
  {#each $estimates as estimate}
    <ProjectCard {deleteEstimate} {estimate}/>
  {:else}
    <h2>You don't have any estimates yet</h2>
  {/each}

  {/await}
</div>

