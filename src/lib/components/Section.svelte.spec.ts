import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import { createRawSnippet } from 'svelte';
import Section from './Section.svelte';

test('renders a labelled section with heading and children', async () => {
	const screen = await render(Section, {
		id: 'about',
		title: 'Om',
		children: createRawSnippet(() => ({ render: () => '<p>Min text</p>' }))
	});

	const section = screen.getByRole('region', { name: 'Om' });
	await expect.element(section).toBeVisible();
	await expect.element(screen.getByRole('heading', { level: 2, name: 'Om' })).toBeVisible();
	await expect.element(screen.getByText('Min text')).toBeVisible();
});
