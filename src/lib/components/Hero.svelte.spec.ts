import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import Hero from './Hero.svelte';

const props = {
	firstName: 'Otto',
	lastName: 'Reimers',
	title: 'Frontendutvecklare',
	location: 'Stockholm, Sverige',
	summary: 'Jag bygger webben.'
};

test('heading reads as the full name to assistive tech', async () => {
	const screen = await render(Hero, props);

	await expect
		.element(screen.getByRole('heading', { level: 1, name: 'Otto Reimers' }))
		.toBeVisible();
});

test('first and last name render as separate lines', async () => {
	const screen = await render(Hero, props);

	const heading = screen.getByRole('heading', { level: 1 });
	const lines = heading.element().querySelectorAll(':scope > span');

	expect(lines).toHaveLength(2);
	expect(lines[0].textContent).toBe('Otto');
	// The i is drawn as a dotless ı so its dot can be animated separately.
	expect(lines[1].textContent).toBe('Reımers');
});

test('each letter is its own element so it can be animated', async () => {
	const screen = await render(Hero, props);

	const heading = screen.getByRole('heading', { level: 1 }).element();

	expect(heading.querySelectorAll('.letter')).toHaveLength('OttoReimers'.length);
	expect(heading.querySelectorAll('.dotless')).toHaveLength(1);
});

test('shows title, location and summary', async () => {
	const screen = await render(Hero, props);

	await expect.element(screen.getByText('Frontendutvecklare')).toBeVisible();
	await expect.element(screen.getByText('Stockholm, Sverige')).toBeVisible();
	await expect.element(screen.getByText('Jag bygger webben.')).toBeVisible();
});
