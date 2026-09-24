<script lang="ts">
	import { tick } from 'svelte';
	import Icon from './Icon.svelte';

	let light = $state(
		typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light'
	);

	function apply(next: boolean) {
		light = next;

		if (next) {
			document.documentElement.dataset.theme = 'light';
		} else {
			delete document.documentElement.dataset.theme;
		}

		try {
			localStorage.setItem('theme', next ? 'light' : 'dark');
		} catch {
			// Storage can be unavailable in private windows. The toggle still works for this visit.
		}
	}

	function toggle() {
		const next = !light;
		const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!document.startViewTransition || reduceMotion) {
			apply(next);
			return;
		}

		document.startViewTransition(async () => {
			apply(next);
			await tick();
		});
	}
</script>

<button
	type="button"
	class="toggle"
	aria-label={light ? 'Byt till mörkt läge' : 'Byt till ljust läge'}
	onclick={toggle}
>
	<Icon name={light ? 'moon' : 'sun'} />
</button>

<style>
	.toggle {
		--icon-size: 1.1rem;

		position: fixed;
		top: var(--space-2);
		right: var(--space-2);
		z-index: 100;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: 1px solid var(--color-border-strong);
		border-radius: 50%;
		background-color: color-mix(in srgb, var(--color-bg) 60%, transparent);
		color: var(--color-fg);
		cursor: pointer;
		transition:
			border-color 0.12s,
			color 0.12s,
			transform 0.1s;
	}

	.toggle:hover {
		border-color: var(--color-fg);
	}

	.toggle:active {
		transform: scale(0.92);
	}
</style>
