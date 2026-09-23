<script lang="ts">
	import Icon from './Icon.svelte';

	// Reads the theme already applied by the inline script in app.html, so the
	// button matches what the visitor sees. `typeof document` guards the prerender step.
	let light = $state(
		typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light'
	);

	function toggle() {
		light = !light;

		if (light) {
			document.documentElement.dataset.theme = 'light';
		} else {
			delete document.documentElement.dataset.theme;
		}

		try {
			localStorage.setItem('theme', light ? 'light' : 'dark');
		} catch {
			// Storage can be unavailable in private windows. The toggle still works for this visit.
		}
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
