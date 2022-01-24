<script>
  import Form from "./form.svelte";
  export let newTrade


</script>

<div>
  <Form>
    <input type="text" name="name" bind:value={newTrade.name} class="text-field">
    <input type="text" name="laborRate" bind:value={newTrade.laborRate} class="text-field">
  </Form>
</div>