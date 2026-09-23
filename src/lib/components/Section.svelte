<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, title, children }: { id: string; title: string; children: Snippet } = $props();
</script>

<section class="section" aria-labelledby="{id}-heading">
	<header>
		<h2 id="{id}-heading">{title}</h2>
	</header>
	{@render children()}
</section>

<style>
	.section {
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-8);
		margin-bottom: var(--space-8);
	}

	.section:last-child {
		margin-bottom: 0;
	}

	header {
		margin-bottom: var(--space-3);
	}

	h2 {
		color: var(--color-fg);
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: -0.015em;
	}
</style>
