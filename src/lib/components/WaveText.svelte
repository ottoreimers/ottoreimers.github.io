<script lang="ts">
	let {
		text,
		playing,
		onend
	}: {
		text: string;
		/** Set to true to start one wave. The parent resets it in onend. */
		playing: boolean;
		onend?: () => void;
	} = $props();

	const letters = $derived([...text]);
</script>

<span class="sr-only">{text}</span>
<span aria-hidden="true"
	>{#each letters as char, i (i)}<span
			class={['letter', { wave: playing }]}
			style:--i={i}
			onanimationend={i === letters.length - 1 ? onend : undefined}>{char}</span
		>{/each}</span
>

<style>
	.letter {
		display: inline-block;
		white-space: pre;
	}

	.wave {
		animation: wave 0.45s ease-in-out;
		animation-delay: calc(var(--i) * 35ms);
	}

	@keyframes wave {
		40% {
			transform: translateY(-0.3em);
		}
		70% {
			transform: translateY(0.05em);
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
</style>
