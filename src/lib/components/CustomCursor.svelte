<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let x = $state(-100);
	let y = $state(-100);
	let size = $state(12);
	let targetX = -100;
	let targetY = -100;
	let targetSize = 12;
	let animationFrame: number | undefined;
	let mounted = $state(false);

	const baseSize = 12;
	const hoverSize = 32;
	const positionSmoothing = 0.15;
	const sizeSmoothing = 0.12;

	function lerp(start: number, end: number, factor: number): number {
		return start + (end - start) * factor;
	}

	function animate() {
		x = lerp(x, targetX, positionSmoothing);
		y = lerp(y, targetY, positionSmoothing);
		size = lerp(size, targetSize, sizeSmoothing);
		animationFrame = requestAnimationFrame(animate);
	}

	function handleMouseMove(e: MouseEvent) {
		targetX = e.clientX;
		targetY = e.clientY;

		// Check hover state on every mouse move to avoid hiccups
		const target = e.target as HTMLElement;
		const isOverClickable = target.closest('a, button, .hoverable, [role="button"]');
		targetSize = isOverClickable ? hoverSize : baseSize;
	}

	onMount(() => {
		mounted = true;
		document.addEventListener('mousemove', handleMouseMove);
		animationFrame = requestAnimationFrame(animate);
	});

	onDestroy(() => {
		document.removeEventListener('mousemove', handleMouseMove);
		if (animationFrame !== undefined) {
			cancelAnimationFrame(animationFrame);
		}
	});
</script>

{#if mounted}
	<div
		class="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full bg-white mix-blend-difference"
		style="
			width: {size}px;
			height: {size}px;
			transform: translate({x - size / 2}px, {y - size / 2}px);
		"
	></div>
{/if}
