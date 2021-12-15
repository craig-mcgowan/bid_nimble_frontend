<script>
	import '../app.css';
	import Header from '$lib/header.svelte'
	import Sidebar from '$lib/sidebar.svelte'
	let dark = false
</script>

<div class:dark>
	<div class= "h-screen w-screen dark:bg-gray-600">

		<Sidebar bind:dark/>
		<Header bind:dark/>
		<main class="pt-20 pl-20"  >
			<slot />
			
		</main>
	</div>
</div>

