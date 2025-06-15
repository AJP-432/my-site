<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex h-screen flex-col">
	<Header sections={['about']} />

	<main class="flex-1 overflow-hidden">
		<About />
	</main>

	<Footer />
</div>
