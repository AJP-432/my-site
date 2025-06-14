<script lang="ts">
	import '../app.css';
	// shadcn-svelte dark mode
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
