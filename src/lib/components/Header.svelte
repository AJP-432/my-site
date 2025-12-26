<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	import ThemeButton from './ui/ThemeButton.svelte';
	import HamburgerButton from './ui/HamburgerButton.svelte';
	import { userConfig } from '$lib/config/userConfig';

	let { sections }: { sections: string[] } = $props();

	function scrollToSection(id: string) {
		setTimeout(() => {
			document.getElementById(id)?.scrollIntoView({
				behavior: 'smooth'
			});
		}, 200);
	}

	function scrollToTop() {
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}, 200);
	}

	let mobileMenuOpen = $state(false);

	function handleMobileLinkClick(sectionId: string) {
		mobileMenuOpen = false; // Close the menu immediately
		scrollToSection(sectionId);
	}
</script>

<header class="bg-background/80 border-border top-0 z-50 border-b p-4 backdrop-blur-sm">
	<nav class="mx-auto flex max-w-4xl items-center justify-between px-4 py-2">
		<!-- Logo and Title -->
		<a
			href="/"
			onclick={(event) => {
				event.preventDefault();
				scrollToTop();
			}}
			class="text-2xl font-bold"
			aria-label="Scroll to top of page"
		>
			{userConfig.site.title}
		</a>

		<!-- Desktop Navigation Links -->
		<div class="hidden items-center space-x-4 md:flex">
			{#each sections as section (section)}
				<Button variant="ghost" onclick={() => scrollToSection(section)}>
					{section.charAt(0).toUpperCase() + section.slice(1)}
				</Button>
			{/each}

			<ThemeButton />
		</div>

		<!-- Mobile Hamburger Menu -->
		<div class="md:hidden">
			<Popover.Root bind:open={mobileMenuOpen}>
				<Popover.Trigger
					class="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 w-9 items-center justify-center rounded-md border p-2"
				>
					<HamburgerButton />
				</Popover.Trigger>
				<Popover.Content class="w-32 p-2">
					<div class="flex flex-col items-center space-y-2">
						{#each sections as section (section)}
							<Button
								class="w-full"
								variant="outline"
								onclick={() => handleMobileLinkClick(section)}
							>
								{section.charAt(0).toUpperCase() + section.slice(1)}
							</Button>
						{/each}

						<ThemeButton class="w-full" variant="outline" />
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</nav>
</header>
