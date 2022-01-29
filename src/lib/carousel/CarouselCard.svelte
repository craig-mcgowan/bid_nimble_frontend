<script>
  export let icon, description
  
</script>

<div class= "mx-auto p-2">
  <div class= "bg-white bg-opacity-70 w-min mx-auto rounded-2xl shadow-slate-900 shadow-md border-4 border-orange-500">
    <div class="aspect-square h-96 mx-auto ">
      <img src={icon} alt={description} class="fill-green-800 stroke-green-500 mx-auto" />
    </div>
    <p class="mx-auto text-center w-96 text-2xl">{description}</p>
  </div>
</div>
