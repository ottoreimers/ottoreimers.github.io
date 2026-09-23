import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import SkillGroups from './SkillGroups.svelte';

const groups = [
	{ title: 'Frontend', skills: ['HTML', 'CSS', 'Svelte'] },
	{ title: 'Verktyg', skills: ['Git'] }
];

test('renders a heading per group', async () => {
	const screen = await render(SkillGroups, { groups });

	await expect.element(screen.getByRole('heading', { level: 3, name: 'Frontend' })).toBeVisible();
	await expect.element(screen.getByRole('heading', { level: 3, name: 'Verktyg' })).toBeVisible();
});

test('renders each skill as a list item', async () => {
	const screen = await render(SkillGroups, { groups });

	expect(screen.getByRole('listitem').all()).toHaveLength(4);
	await expect.element(screen.getByText('Svelte')).toBeVisible();
});
