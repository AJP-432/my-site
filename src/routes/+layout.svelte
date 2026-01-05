<script lang="ts">
	import '../app.css';
	// shadcn-svelte dark mode
	import { ModeWatcher } from 'mode-watcher';
	// Custom cursor
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	// Vercel Analytics
	import { inject } from '@vercel/analytics';
	import { browser } from '$app/environment';
	import isMobile from 'ismobilejs';

	let { children } = $props();

	// Start as undefined to prevent flash - cursor only shows after we confirm it's desktop
	let showCursor = $state(false);

	$effect(() => {
		if (browser) {
			const isMobileDevice = isMobile(navigator.userAgent).any;
			showCursor = !isMobileDevice;
			// Initialize Vercel Analytics
			inject();
		}
	});
</script>

<ModeWatcher />
{#if showCursor}
	<CustomCursor />
{/if}
{@render children()}
