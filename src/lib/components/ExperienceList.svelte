<script lang="ts">
	import type { ExperienceItem } from '$lib/content';

	let { items }: { items: ExperienceItem[] } = $props();
</script>

<ol>
	{#each items as item (item.title + item.period)}
		<li class="item">
			<h3 class="title">{item.title}</h3>
			<p class="meta">
				<strong>{item.org}</strong>{#if item.location}<span class="location">{item.location}</span
					>{/if}
			</p>
			<span class="period">{item.period}</span>
			<div class="body">
				{#each item.paragraphs as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</li>
	{/each}
</ol>

<style>
	.item {
		display: grid;
		gap: var(--space-1);
		grid-template-areas:
			'title'
			'meta'
			'period'
			'paragraphs';
		margin-bottom: var(--space-5);
	}

	.item:last-child {
		margin-bottom: 0;
	}

	@media (min-width: 640px) {
		.item {
			grid-template-columns: 9rem 1fr;
			grid-template-areas:
				'period title'
				'period meta'
				'period paragraphs';
			column-gap: var(--space-4);
			row-gap: var(--space-2);
			align-items: baseline;
		}
	}

	.title {
		grid-area: title;
		color: var(--color-fg);
		font-size: var(--text-lg);
		font-weight: 600;
		line-height: 1.3;
	}

	.meta {
		grid-area: meta;
		color: var(--color-fg-soft);
		font-size: var(--text-sm);
	}

	.meta strong {
		color: var(--color-fg);
		font-weight: 500;
	}

	.location::before {
		content: ' · ';
	}

	.period {
		grid-area: period;
		color: var(--color-muted);
		font-size: var(--text-xs);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.02em;
		margin-bottom: var(--space-2);
	}

	@media (min-width: 640px) {
		.period {
			margin-bottom: 0;
		}
	}

	.body {
		grid-area: paragraphs;
		color: var(--color-fg-soft);
	}

	.body p {
		font-size: var(--text-base);
		line-height: 1.65;
	}

	.body p + p {
		margin-top: var(--space-2);
	}
</style>
