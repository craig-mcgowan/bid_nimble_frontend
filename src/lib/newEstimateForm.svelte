<script>
  const dbURL = "https://bidnimble-api.herokuapp.com"
  import {session} from "$app/stores"
  import {onMount} from "svelte"
  import { goto } from "$app/navigation";

  export let closed
  let ref


  let newEstimate = {
    name: "",
    location: "",
    trades: [],
    subtotal: "0",
    fees: [],
    total: "0"
  }

  const findNewProject= async(name) => {

  }
  
  $: if (!closed) {ref.focus()}
  
  const createEstimate = async(estimate) => {
    const sendEstimate = JSON.stringify(estimate)
    console.log(sendEstimate)
    const res = await fetch(`${dbURL}/estimate`, {
      "method": "post",
      "headers": {"Content-Type": "application/json"},
      "body": sendEstimate,
    })
    const newProject = await res.json()
    newEstimate = {
    name: "",
    location: "",
    trades: [],
    subtotal: "0",
    fees: [],
    total: "0"
    }
    closed=true
    goto(`/app/estimates/${newProject._id}`)
  }

</script>


<form class = "flex flex-col text-[15px]"on:submit|preventDefault={()=>createEstimate(newEstimate)}>
  <label for="name">Project Name: </label>
  <input class = "text-field h-6" type="text" bind:value={newEstimate.name} id="name" name="name" bind:this={ref}>
  <label for="location">Project Address: </label>
  <input class = "text-field h-6" type="text" bind:value={newEstimate.location} id="location" location="location">
  <label for="name"> </label> 
  <input class="gray-btn h-8 w-3/5 my-2 mx-auto" type="submit" value="Create Project">
</form>
