<script lang="ts">
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Header sections={['about', 'experience', 'projects', 'contact']} />

	<main class="flex-1">
		<section
			id="about"
			class="border-border flex min-h-screen items-center justify-center border-b p-8"
		>
			<h2 class="text-4xl">About Me Section</h2>
		</section>
		<section
			id="experience"
			class="border-border flex min-h-screen items-center justify-center border-b p-8"
		>
			<h2 class="text-4xl">Work Experience Section</h2>
		</section>
		<section
			id="projects"
			class="border-border flex min-h-screen items-center justify-center border-b p-8"
		>
			<h2 class="text-4xl">Cool Projects Section</h2>
		</section>
		<section id="contact" class="flex min-h-screen items-center justify-center p-8">
			<h2 class="text-4xl">Contact Info Section</h2>
		</section>
	</main>

	<footer class="text-muted-foreground p-8 text-center">
		<p>&copy; {new Date().getFullYear()} MY_SITE.exe</p>
	</footer>
</div>
