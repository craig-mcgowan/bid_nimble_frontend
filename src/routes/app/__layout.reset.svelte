<script>
	import '../../app.css';
	import Header from '$lib/header.svelte'
	import Sidebar from '$lib/sidebar.svelte'
	let dark = false
</script>

<div class:dark>
	<div  class= "h-screen w-screen bg-fixed bg-cover bg-center dark:bg-gray-600 dark:text-white">

		<Sidebar bind:dark/>
		<Header bind:dark/>
		<main class="pt-20 pl-20" >
			<slot></slot>
		</main>
		<footer class = "fixed  bottom-0 w-screen h-20 bg-gradient-to-t from-gray-300 dark:bg-gradient-to-t dark:from-gray-700"></footer>
	</div>
</div>

