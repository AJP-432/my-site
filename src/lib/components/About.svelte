<script lang="ts">
	import AboutContent from '$lib/content/about.svx';
	import SpotifyNowPlaying from './SpotifyNowPlaying.svelte';
</script>

<section id="about" class="flex h-full items-start justify-center p-6 pt-16">
	<div class="mx-auto w-full max-w-6xl">
		<!-- Desktop: Side by side layout -->
		<div class="hidden md:grid md:grid-cols-2 md:items-center md:gap-8">
			<!-- Left: Content area -->
			<div class="h-64 p-6">
				<div class="flex flex-col space-y-3">
					<div class="space-y-3 text-left">
						<AboutContent />
					</div>
				</div>
			</div>

			<!-- Right: Spotify Now Playing -->
			<div class="flex h-64 items-center justify-center">
				<SpotifyNowPlaying />
			</div>
		</div>

		<!-- Mobile: Single layout -->
		<div class="md:hidden">
			<div class="p-6">
				<div class="flex flex-col space-y-3">
					<div class="space-y-3 text-left">
						<AboutContent />
					</div>
					<div class="mt-6 flex justify-center">
						<SpotifyNowPlaying />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
