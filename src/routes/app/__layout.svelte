<script>
	import '../../app.css';
	import NavBar from '../../lib/NavBar.svelte';
	import Sidebar from '$lib/sidebar.svelte'
	let dark = false

</script>
	
<script context="module">
export async function load({page, session}) {
  if (session.user === '') {
    return { redirect: '/', status: 302 }
  }
  return { props: {} }
}
</script>

<div class:dark>
	<div  class= "h-full w-screen bg-fixed bg-cover bg-center dark:bg-gray-600 dark:text-white">
		<Sidebar bind:dark/>
		<NavBar bind:dark/>
		<main class=" pt-20 pl-20 pb-20 w-screen " >
			<slot></slot>
		</main>
		<footer class = "fixed  bottom-0 w-screen -z-10 h-20 bg-gradient-to-t from-gray-300 dark:bg-gradient-to-t dark:from-gray-700"></footer>
	</div>
</div>

