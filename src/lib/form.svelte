<script>
  const onSubmit = e => {
    const formData = new FormData(e.target);
    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data)
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <slot></slot>
  <button class="green-btn" type="submit">Submit</button>
</form>