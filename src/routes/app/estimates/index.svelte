<script context="module">
	
  export async function load({ page }) {
    const res = await fetch(`https://bidnimble-api.herokuapp.com/estimate`, {
		method: 'get',
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
  
  if (res.ok) {
    return {
      props: {
         estimates: await res.json()
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
  export let estimates
  import ProjectCard from "$lib/projectCard.svelte";
</script>

<div>
  {#each estimates as estimate}
    <ProjectCard {...estimate}/>
  {:else}
    <h2>You don't have any estimates yet</h2>
  {/each}
</div>
  
