import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import ExperienceList from './ExperienceList.svelte';

const items = [
	{
		period: '2022 — nu',
		title: 'Frontendutvecklare',
		org: 'Fröjd',
		location: 'Stockholm',
		paragraphs: ['Första stycket.', 'Andra stycket.']
	},
	{
		period: '2019 — 2022',
		title: 'Webbutvecklare',
		org: 'Byrån',
		location: 'Göteborg',
		paragraphs: ['Ett stycke.']
	}
];

test('renders one list item per entry', async () => {
	const screen = await render(ExperienceList, { items });

	expect(screen.getByRole('listitem').all()).toHaveLength(2);
});

test('shows period, title, organisation and location for an entry', async () => {
	const screen = await render(ExperienceList, { items });

	await expect.element(screen.getByText('2022 — nu')).toBeVisible();
	await expect
		.element(screen.getByRole('heading', { level: 3, name: 'Frontendutvecklare' }))
		.toBeVisible();
	await expect.element(screen.getByText('Fröjd')).toBeVisible();
	await expect.element(screen.getByText('Stockholm', { exact: false })).toBeVisible();
});

test('renders every paragraph of an entry', async () => {
	const screen = await render(ExperienceList, { items });

	await expect.element(screen.getByText('Första stycket.')).toBeVisible();
	await expect.element(screen.getByText('Andra stycket.')).toBeVisible();
});
