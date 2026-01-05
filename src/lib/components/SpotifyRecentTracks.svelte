<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import SpotifySongCard from './SpotifySongCard.svelte';
	import type { SpotifyData } from '$lib/types/spotify';

	let data = $state<SpotifyData>({ isPlaying: false, currentTrack: null, recentTracks: [] });
	let loading = $state(true);
	let intervalId: ReturnType<typeof setInterval>;

	// Deduplicate tracks by songUrl
	function deduplicateTracks(tracks: typeof data.recentTracks) {
		const seen = new Set<string>();
		return tracks.filter((track) => {
			if (seen.has(track.songUrl)) return false;
			seen.add(track.songUrl);
			return true;
		});
	}

	// Get display tracks - if playing, show current + 2 recent (excluding duplicates), otherwise show 3 recent
	let displayTracks = $derived.by(() => {
		const uniqueRecent = deduplicateTracks(data.recentTracks);

		if (data.isPlaying && data.currentTrack) {
			// Filter out the current track from recent tracks
			const filteredRecent = uniqueRecent.filter(
				(track) => track.songUrl !== data.currentTrack?.songUrl
			);
			return [data.currentTrack, ...filteredRecent.slice(0, 2)];
		}
		return uniqueRecent.slice(0, 3);
	});

	async function fetchSpotifyData() {
		try {
			const res = await fetch('/api/spotify');
			const json = await res.json();
			data = json;
		} catch (error) {
			console.error('Error fetching Spotify data:', error);
			data = { isPlaying: false, currentTrack: null, recentTracks: [] };
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchSpotifyData();
		intervalId = setInterval(fetchSpotifyData, 30000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<div class="w-full max-w-xs">
	<div
		class="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-medium tracking-wide uppercase"
	>
		<svg class="h-4 w-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
			<path
				d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
			/>
		</svg>
		<span
			>{#if data.isPlaying}Now Playing{:else}Recently Played{/if}</span
		>
	</div>
	<div class="flex flex-col gap-2">
		{#if loading}
			<!-- Loading skeleton stack -->
			{#each [0, 1, 2] as i (i)}
				<div
					class="bg-secondary/50 flex items-center gap-3 rounded-lg p-3"
					style="opacity: {1 - i * 0.25};"
				>
					<div class="bg-muted h-10 w-10 shrink-0 animate-pulse rounded-md"></div>
					<div class="min-w-0 flex-1">
						<div class="bg-muted mb-1.5 h-3 w-3/4 animate-pulse rounded"></div>
						<div class="bg-muted h-2.5 w-1/2 animate-pulse rounded"></div>
					</div>
				</div>
			{/each}
		{:else if displayTracks.length > 0}
			<!-- Cards with slight gap and opacity fade -->
			{#each displayTracks as track, i (track.songUrl)}
				<div class="hoverable transition-all duration-300" style="opacity: {1 - i * 0.2};">
					<SpotifySongCard {track} isPlaying={data.isPlaying && i === 0} />
				</div>
			{/each}
		{:else}
			<p class="text-muted-foreground text-sm">No recent tracks</p>
		{/if}
	</div>
</div>
