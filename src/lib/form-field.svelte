<script>
  export let type, id, fieldName, label , value = "", styling
</script>
<div>
  {#if label}
    <label for="name">{label}:</label>
  {/if}
  <input class= {styling} type={type} 
  name={fieldName}
  value = {value}
  />

</div>