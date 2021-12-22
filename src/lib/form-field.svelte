<script>
  export let type, id, fieldName
</script>
<div>
  <label for="name">{fieldName}</label>
  <input type={type} 
  name={fieldName}
  value = ""
  />

</div>