<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface SpotifyData {
		isPlaying: boolean;
		title?: string;
		artist?: string;
		album?: string;
		albumImageUrl?: string;
		songUrl?: string;
	}

	let data = $state<SpotifyData>({ isPlaying: false });
	let loading = $state(true);
	let intervalId: ReturnType<typeof setInterval>;

	async function fetchNowPlaying() {
		try {
			const res = await fetch('/api/spotify');
			const json = await res.json();
			data = json;
		} catch (error) {
			console.error('Error fetching Spotify data:', error);
			data = { isPlaying: false };
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchNowPlaying();
		// Refresh every 30 seconds
		intervalId = setInterval(fetchNowPlaying, 30000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<div
	class="bg-secondary/50 hover:bg-secondary/80 flex w-full max-w-xs items-center gap-3 rounded-lg p-3 transition-colors duration-300"
>
	<!-- Spotify Icon -->
	<svg class="h-5 w-5 shrink-0 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
		<path
			d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
		/>
	</svg>

	<div class="flex h-10 min-w-0 flex-1 items-center gap-3">
		{#if loading}
			<!-- Loading skeleton -->
			<div class="bg-muted h-10 w-10 shrink-0 animate-pulse rounded-md"></div>
			<div class="min-w-0 flex-1">
				<div class="bg-muted mb-1.5 h-3 w-3/4 animate-pulse rounded"></div>
				<div class="bg-muted h-2.5 w-1/2 animate-pulse rounded"></div>
			</div>
		{:else if data.isPlaying && data.albumImageUrl}
			<!-- Now playing -->
			<a
				href={data.songUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex min-w-0 flex-1 items-center gap-3 transition-opacity hover:opacity-80"
			>
				<img
					src={data.albumImageUrl}
					alt={data.album || 'Album cover'}
					class="h-10 w-10 shrink-0 rounded-md"
				/>
				<div class="min-w-0 flex-1">
					<p class="text-foreground truncate text-sm font-medium">
						{data.title}
					</p>
					<p class="text-muted-foreground truncate text-xs">
						{data.artist}
					</p>
				</div>
				<!-- Animated equalizer bars -->
				<div class="flex h-4 items-end gap-0.5">
					<span class="equalizer-bar w-0.5 rounded-full bg-[#1DB954]"></span>
					<span class="equalizer-bar animation-delay-200 w-0.5 rounded-full bg-[#1DB954]"></span>
					<span class="equalizer-bar animation-delay-400 w-0.5 rounded-full bg-[#1DB954]"></span>
				</div>
			</a>
		{:else}
			<!-- Not playing -->
			<p class="text-muted-foreground text-sm">He's not listening...</p>
		{/if}
	</div>
</div>

<style>
	/* Equalizer bar animations by moving height up and down  by using keyframes */
	.equalizer-bar {
		height: 30%;
		animation: equalizer 1s ease-in-out infinite;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}

	.animation-delay-400 {
		animation-delay: 0.4s;
	}

	@keyframes equalizer {
		0%,
		100% {
			height: 30%;
		}
		50% {
			height: 100%;
		}
	}
</style>
