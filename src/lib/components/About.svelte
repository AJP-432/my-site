<script lang="ts">
	import AboutContent from '$lib/content/about.svx';
</script>

<section id="about" class="flex min-h-screen items-center justify-center p-8">
	<div class="mx-auto w-full max-w-6xl">
		<!-- Desktop: Side by side layout -->
		<div class="hidden md:grid md:grid-cols-2 md:items-center md:gap-12">
			<!-- Left: Glass card with content -->
			<div
				class="bg-background/20 h-96 rounded-2xl border border-white/10 p-8 shadow-2xl backdrop-blur-md"
			>
				<div class="flex flex-col items-center space-y-6">
					<div class="space-y-4 text-left">
						<AboutContent />
					</div>
				</div>
			</div>

			<!-- Right: Space for 3D object -->
			<div class="flex items-center justify-center">
				<div
					class="bg-background/10 flex h-96 w-full items-center justify-center rounded-2xl border border-white/5 backdrop-blur-sm"
				>
					<span class="text-muted-foreground">3D Object Placeholder</span>
				</div>
			</div>
		</div>

		<!-- Mobile: Stacked layout (no 3D object) -->
		<div class="md:hidden">
			<div
				class="bg-background/20 rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-md"
			>
				<div class="flex flex-col items-center space-y-6">
					<div class="space-y-4 text-left">
						<AboutContent />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
