<script lang="ts">
	import '../app.css';
	// shadcn-svelte dark mode
	import { ModeWatcher } from 'mode-watcher';

	// Custom cursor; see https://www.npmjs.com/package/curseur
	import { Cursor } from 'curseur';

	let { children } = $props();
</script>

<ModeWatcher />
<Cursor color="white" mixBlendMode="exclusion" size={12} />
{@render children()}
