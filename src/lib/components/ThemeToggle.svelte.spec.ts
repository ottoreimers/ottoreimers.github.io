import { render } from 'vitest-browser-svelte';
import { beforeEach, expect, test } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';

beforeEach(() => {
	delete document.documentElement.dataset.theme;
	localStorage.removeItem('theme');
});

test('starts in dark mode and offers to switch to light', async () => {
	const screen = await render(ThemeToggle);

	await expect.element(screen.getByRole('button', { name: 'Byt till ljust läge' })).toBeVisible();
	expect(document.documentElement.dataset.theme).toBeUndefined();
});

test('clicking switches the document to light mode and remembers it', async () => {
	const screen = await render(ThemeToggle);

	await screen.getByRole('button', { name: 'Byt till ljust läge' }).click();

	expect(document.documentElement.dataset.theme).toBe('light');
	expect(localStorage.getItem('theme')).toBe('light');
	await expect.element(screen.getByRole('button', { name: 'Byt till mörkt läge' })).toBeVisible();
});

test('clicking twice returns to dark mode', async () => {
	const screen = await render(ThemeToggle);

	await screen.getByRole('button', { name: 'Byt till ljust läge' }).click();
	await screen.getByRole('button', { name: 'Byt till mörkt läge' }).click();

	expect(document.documentElement.dataset.theme).toBeUndefined();
	expect(localStorage.getItem('theme')).toBe('dark');
});

test('respects a light theme already applied to the document', async () => {
	document.documentElement.dataset.theme = 'light';

	const screen = await render(ThemeToggle);

	await expect.element(screen.getByRole('button', { name: 'Byt till mörkt läge' })).toBeVisible();
});
