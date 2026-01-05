<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex h-screen flex-col">
	<Header sections={['about']} />

	<main class="scrollbar-hidden flex-1 overflow-y-auto">
		<About />
	</main>

	<Footer />
</div>
