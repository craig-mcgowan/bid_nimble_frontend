<script>
	import '../app.css';
	import Header from '$lib/header.svelte'
	import Sidebar from '$lib/sidebar.svelte'
</script>
<Sidebar/>
<Header/>
<main class="mt-20 ml-20">
	<slot />

</main>

