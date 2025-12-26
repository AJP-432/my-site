<script lang="ts">
	import { onDestroy } from 'svelte';

	let { ipa, text, audioSrc }: { ipa: string; text?: string; audioSrc?: string } = $props();

	let isPlaying = $state(false);
	let currentAudio: HTMLAudioElement | null = null;

	// Cleanup on component destroy to prevent memory leaks
	onDestroy(() => {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.src = '';
			currentAudio = null;
		}
		if (typeof speechSynthesis !== 'undefined') {
			speechSynthesis.cancel();
		}
		isPlaying = false;
	});

	function playAudio() {
		if (isPlaying) return; // Prevent multiple plays

		if (audioSrc) {
			// Stop any existing audio
			if (currentAudio) {
				currentAudio.pause();
				currentAudio.currentTime = 0;
			}

			currentAudio = new Audio(audioSrc);
			isPlaying = true;

			currentAudio.addEventListener('ended', () => {
				isPlaying = false;
				currentAudio = null;
			});

			currentAudio.addEventListener('error', () => {
				isPlaying = false;
				currentAudio = null;
			});

			currentAudio.play().catch((e) => {
				console.log('Audio failed:', e);
				isPlaying = false;
				currentAudio = null;
			});
		} else if (text) {
			// Stop any existing speech
			speechSynthesis.cancel();

			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 0.7;
			isPlaying = true;

			utterance.addEventListener('end', () => {
				isPlaying = false;
			});

			utterance.addEventListener('error', () => {
				isPlaying = false;
			});

			speechSynthesis.speak(utterance);
		}
	}
</script>

<button
	onclick={playAudio}
	class="ipa-btn prose-neutral dark:prose-invert transition-opacity hover:opacity-70"
	class:playing={isPlaying}
	title="Click to hear pronunciation"
	disabled={isPlaying}
>
	({ipa})
</button>

<style>
	.ipa-btn {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		text-decoration: underline;
		text-decoration-style: dotted;
		font-family: inherit;
	}

	.ipa-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.playing {
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
