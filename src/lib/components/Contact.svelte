<script lang="ts">
	import type { ContactLink } from '$lib/content';
	import Icon from './Icon.svelte';
	import WaveText from './WaveText.svelte';

	let { name, links, photo }: { name: string; links: ContactLink[]; photo?: string } = $props();

	const initials = $derived(
		name
			.split(/\s+/)
			.map((part) => part[0] ?? '')
			.join('')
			.toUpperCase()
	);

	// Which links are mid-wave, keyed by href. A wave always finishes before it can restart.
	let waving: Record<string, boolean> = $state({});
</script>

<aside class="aside">
	{#if photo}
		<img class="photo" src={photo} alt={name} width="128" height="128" />
	{:else}
		<div class="photo initials" aria-hidden="true">{initials}</div>
	{/if}

	<section aria-labelledby="contact-heading">
		<header>
			<h2 id="contact-heading">Kontakt</h2>
		</header>
		<address>
			<!-- Contact links are external (mailto, https), so SvelteKit's resolve() does not apply. -->
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			{#each links as link (link.href)}
				{@const external = link.href.startsWith('http')}
				<a
					href={link.href}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener noreferrer' : undefined}
					onpointerenter={() => (waving[link.href] = true)}
					onfocus={() => (waving[link.href] = true)}
				>
					<Icon name={link.kind} />
					<span class="label">
						<WaveText
							text={link.label}
							playing={waving[link.href] ?? false}
							onend={() => (waving[link.href] = false)}
						/>
					</span>
				</a>
			{/each}
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</address>
	</section>
</aside>

<style>
	.aside {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
		max-width: var(--content-width);
		margin: 0 auto;
		padding: 0 var(--space-3) var(--space-12);
		text-align: center;
	}

	@media (min-width: 1024px) {
		.aside {
			position: sticky;
			top: 0;
			align-self: start;
			align-items: stretch;
			max-width: none;
			margin: 0;
			padding: var(--space-8) var(--space-3) var(--space-16) 0;
			text-align: left;
		}
	}

	.photo {
		width: 128px;
		height: 128px;
		border-radius: 50%;
		object-fit: cover;
	}

	.initials {
		display: grid;
		place-items: center;
		background: var(--color-surface);
		border: 1px solid var(--color-border-strong);
		color: var(--color-accent);
		font-size: 2rem;
		font-weight: 600;
		letter-spacing: -0.04em;
	}

	header {
		margin-bottom: var(--space-2);
	}

	h2 {
		color: var(--color-fg);
		font-size: var(--text-lg);
		font-weight: 500;
		letter-spacing: -0.005em;
	}

	address {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}

	@media (min-width: 1024px) {
		address {
			align-items: flex-start;
		}
	}

	a {
		--icon-size: 1.2em;

		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		color: var(--color-accent);
		font-size: var(--text-base);
		font-weight: 500;
		white-space: nowrap;
		transition: color 0.12s;
	}

	a:hover {
		color: var(--color-fg);
	}

	/* Anchors the visually hidden text inside WaveText. */
	.label {
		position: relative;
	}
</style>
