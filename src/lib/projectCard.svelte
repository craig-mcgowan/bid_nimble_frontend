<script>
export let estimate, deleteEstimate
import FaTrashAlt from "svelte-icons/fa/FaTrashAlt.svelte";
</script>
<section class = "hover:scale-[102%] border w-7/12 flex ml-10 border-sky-700 rounded-2xl shadow py-1 px-3 mt-3 ml-20">
  <a class="w-full" href={`/app/estimates/${estimate._id}`}>
    <div class=" cursor-pointer   flex justify-between">
      <div>
        <h3 class="text-xl">{estimate.name}</h3>
        <span class="text-slate-500">{estimate.location}</span>
      </div>
      <div>
        <span>Total: $ {Number(estimate.total).toLocaleString()}</span>
      </div>
      
    </div>
  </a>
  <button on:click={()=>deleteEstimate(estimate)} class="ml-1 text-red-100 group-hover:text-red-300 hover:scale-110 self-center hover:text-red-600 h-4">
    <FaTrashAlt/>
  </button>
</section>


<style>

</style>
