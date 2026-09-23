<script lang="ts">
	import type { ContactLink } from '$lib/content';

	let { name }: { name: 'sun' | 'moon' | ContactLink['kind'] } = $props();
</script>

<!-- Size it from the parent with the --icon-size custom property. Defaults to the text size. -->
<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'sun'}
		<circle cx="12" cy="12" r="4" />
		<line x1="12" y1="2" x2="12" y2="4" />
		<line x1="12" y1="20" x2="12" y2="22" />
		<line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
		<line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
		<line x1="2" y1="12" x2="4" y2="12" />
		<line x1="20" y1="12" x2="22" y2="12" />
		<line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
		<line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
	{:else if name === 'moon'}
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	{:else if name === 'email'}
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="m3 7 9 6 9-6" />
	{:else if name === 'phone'}
		<path
			d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
		/>
	{:else if name === 'linkedin'}
		<rect x="2" y="2" width="20" height="20" rx="3" />
		<path d="M8 11v5" />
		<path d="M8 8v.01" stroke-width="2.5" />
		<path d="M12 16v-5" />
		<path d="M16 16v-3a2 2 0 0 0-4 0" />
	{:else if name === 'github'}
		<path
			d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
		/>
		<path d="M9 18c-4.51 2-5-2-7-2" />
	{:else}
		<circle cx="12" cy="12" r="10" />
		<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
		<path d="M2 12h20" />
	{/if}
</svg>

<style>
	svg {
		flex-shrink: 0;
		width: var(--icon-size, 1em);
		height: var(--icon-size, 1em);
	}
</style>
