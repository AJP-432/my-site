<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import ThemeButton from './ui/ThemeButton.svelte';
	import HamburgerButton from './ui/HamburgerButton.svelte';

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({
			behavior: 'smooth'
		});
	}

	let { sections }: { sections: string[] } = $props();
</script>

<header class="bg-background/80 border-border sticky top-0 z-50 border-b p-4 backdrop-blur-sm">
	<nav class="container mx-auto flex items-center justify-between px-4 py-2">
		<h1 class="text-2xl font-bold">MY_SITE.exe</h1>

		<div class="hidden items-center space-x-4 md:flex">
			{#each sections as section (section)}
				<Button variant="link" onclick={() => scrollToSection(section)}>
					{section.charAt(0).toUpperCase() + section.slice(1)}
				</Button>
			{/each}

			<ThemeButton />
		</div>

		<div class="md:hidden">
			<HamburgerButton onclick={() => console.log('hello')} />
		</div>
	</nav>
</header>
