<script lang="ts">
	import '../app.css';
	// shadcn-svelte dark mode
	import { ModeWatcher } from 'mode-watcher';
	// Custom cursor; see https://www.npmjs.com/package/curseur
	import { Cursor } from 'curseur';
	// Vercel Analytics
	import { inject } from '@vercel/analytics';
	import { browser } from '$app/environment';
	import isMobile from 'ismobilejs';

	let { children } = $props();

	let isMobileDevice = $state(false);

	$effect(() => {
		if (browser) {
			isMobileDevice = isMobile(navigator.userAgent).any;
			// Initialize Vercel Analytics
			inject();
		}
	});
</script>

<ModeWatcher />
{#if !isMobileDevice}
	<Cursor color="white" mixBlendMode="exclusion" size={12} />
{/if}
{@render children()}
