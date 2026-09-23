<script lang="ts">
	import { content } from '$lib/content';
	import Hero from '$lib/components/Hero.svelte';
	import Section from '$lib/components/Section.svelte';
	import ExperienceList from '$lib/components/ExperienceList.svelte';
	import SkillGroups from '$lib/components/SkillGroups.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<div class="page">
	<article class="content">
		<Hero
			firstName={content.name.first}
			lastName={content.name.last}
			title={content.title}
			location={content.location}
			summary={content.summary}
		/>

		<Section id="experience" title="Erfarenhet">
			<ExperienceList items={content.experience} />
		</Section>

		<Section id="education" title="Utbildning">
			<ExperienceList items={content.education} />
		</Section>

		<Section id="skills" title="Kompetenser">
			<SkillGroups groups={content.skills} />
		</Section>

		<Section id="personal" title="Vid sidan av">
			<div class="prose">
				{#each content.personal as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			</div>
		</Section>
	</article>

	<Contact
		name="{content.name.first} {content.name.last}"
		links={content.contact}
		photo={content.photo}
	/>
</div>

<style>
	.page {
		max-width: var(--content-width);
		margin: 0 auto;
	}

	@media (min-width: 1024px) {
		.page {
			display: grid;
			grid-template-columns: 1fr 21rem;
			column-gap: var(--space-6);
			align-items: start;
		}
	}

	.content {
		padding: var(--space-8) var(--space-3) var(--space-16);
	}

	@media (min-width: 1024px) {
		.content {
			padding-right: 0;
		}
	}

	.prose {
		color: var(--color-fg-soft);
	}

	.prose p + p {
		margin-top: var(--space-2);
	}
</style>
