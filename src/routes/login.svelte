 <script>
   import Form from "$lib/form.svelte";
   import FormField from "$lib/form-field.svelte";
 </script>

<Form>
  <FormField fieldName="email" type="email" />
  <FormField fieldName="username" type="text"/>
  <FormField fieldName="password" type="password"/>
</Form>
