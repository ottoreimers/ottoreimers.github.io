<script lang="ts">
	import type { SkillGroup } from '$lib/content';

	let { groups }: { groups: SkillGroup[] } = $props();
</script>

<div class="groups">
	{#each groups as group (group.title)}
		<div class="group">
			<h3>{group.title}</h3>
			<ul>
				{#each group.skills as skill (skill)}
					<li>{skill}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.groups {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	h3 {
		color: var(--color-fg);
		font-size: var(--text-base);
		font-weight: 500;
	}

	ul {
		color: var(--color-fg-soft);
		font-size: var(--text-base);
		line-height: 1.65;
	}

	li {
		display: inline;
	}

	li:not(:last-child)::after {
		content: ', ';
	}
</style>
