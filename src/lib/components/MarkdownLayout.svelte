<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="prose prose-sm prose-neutral dark:prose-invert max-w-none">
	{@render children()}
</div>
