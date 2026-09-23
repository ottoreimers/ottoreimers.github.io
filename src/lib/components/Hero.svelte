<script lang="ts">
	let {
		firstName,
		lastName,
		title,
		location,
		summary
	}: {
		firstName: string;
		lastName: string;
		title: string;
		location: string;
		summary: string;
	} = $props();

	// Each line's letters start animating after the previous line has begun.
	const lines = $derived([
		{ word: firstName, offset: 0 },
		{ word: lastName, offset: firstName.length }
	]);
</script>

<header class="hero">
	<h1 aria-label="{firstName} {lastName}">
		{#each lines as line (line.offset)}
			<span aria-hidden="true"
				>{#each [...line.word] as char, i (i)}{#if char === 'i'}<span
							class="letter dotless"
							style:--i={line.offset + i}>ı</span
						>{:else}<span class="letter" style:--i={line.offset + i}>{char}</span>{/if}{/each}</span
			>
		{/each}
	</h1>
	<div class="meta">
		<p class="title">{title}</p>
		<p class="location">{location}</p>
	</div>
	<p class="summary">{summary}</p>
</header>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-8);
	}

	h1 {
		color: var(--color-fg);
		font-size: clamp(2.75rem, 11vw, 6rem);
		font-weight: 600;
		letter-spacing: -0.045em;
		line-height: 0.915;
	}

	h1 > span {
		display: block;
	}

	h1 > span + span {
		color: var(--color-accent);
	}

	/* Letters rise into place one after another, then lift slightly on hover. */
	.letter {
		display: inline-block;
		animation: rise 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.3) backwards;
		animation-delay: calc(var(--i) * 45ms);
		transition: transform 0.2s cubic-bezier(0.3, 1.6, 0.5, 1);
	}

	.letter:hover {
		transform: translateY(-0.08em) rotate(-4deg);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(0.5em) rotate(10deg);
		}
	}

	/* The dot of the i is drawn separately so it can fall in and bounce onto the stem. */
	.dotless {
		position: relative;
	}

	.dotless::after {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 0.16em;
		height: 0.16em;
		border-radius: 50%;
		background: var(--color-fg);
		transform: translateX(-50%);
		animation: drop 1.2s linear 1.1s backwards;
	}

	@keyframes drop {
		0% {
			opacity: 0;
			transform: translate(-50%, -2em);
			animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.3);
		}
		10% {
			opacity: 1;
		}
		45% {
			transform: translate(-50%, 0) scale(1.3, 0.7);
			animation-timing-function: cubic-bezier(0.1, 0.6, 0.4, 1);
		}
		65% {
			transform: translate(-50%, -0.35em);
			animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.4);
		}
		80% {
			transform: translate(-50%, 0) scale(1.15, 0.85);
			animation-timing-function: cubic-bezier(0.1, 0.6, 0.4, 1);
		}
		90% {
			transform: translate(-50%, -0.1em);
			animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.4);
		}
		100% {
			transform: translate(-50%, 0);
		}
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.title {
		color: var(--color-fg);
		font-size: var(--text-base);
		font-weight: 500;
		letter-spacing: -0.01em;
	}

	.location {
		color: var(--color-muted);
		font-size: var(--text-xs);
	}

	.summary {
		color: var(--color-fg);
		font-size: var(--text-lg);
		line-height: 1.55;
		max-width: 56ch;
		text-wrap: balance;
	}
</style>
