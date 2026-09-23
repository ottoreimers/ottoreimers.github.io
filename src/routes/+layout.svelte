<script lang="ts">
	import '@fontsource-variable/fira-code';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { content } from '$lib/content';

	let { children } = $props();
</script>

<svelte:head>
	<title>{content.name.first} {content.name.last} — {content.title}</title>
	<meta name="description" content={content.summary} />
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeToggle />

<main>
	{@render children()}
</main>
