<script lang="ts">
	import type { SpotifyTrack } from '$lib/types/spotify';

	interface Props {
		track: SpotifyTrack;
		isPlaying?: boolean;
	}

	let { track, isPlaying = false }: Props = $props();
</script>

<a
	href={track.songUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="hoverable bg-secondary/50 hover:bg-secondary/80 flex w-full max-w-xs items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
>
	<img
		src={track.albumImageUrl}
		alt={track.album || 'Album cover'}
		class="h-10 w-10 shrink-0 rounded-md"
	/>
	<div class="min-w-0 flex-1">
		<p class="text-foreground truncate text-sm font-medium">
			{track.title}
		</p>
		<p class="text-muted-foreground truncate text-xs">
			{track.artist}
		</p>
	</div>
	{#if isPlaying}
		<!-- Animated equalizer bars -->
		<div class="flex h-4 items-end gap-0.5">
			<span class="equalizer-bar w-0.5 rounded-full bg-[#1DB954]"></span>
			<span class="equalizer-bar animation-delay-200 w-0.5 rounded-full bg-[#1DB954]"></span>
			<span class="equalizer-bar animation-delay-400 w-0.5 rounded-full bg-[#1DB954]"></span>
		</div>
	{/if}
</a>

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
