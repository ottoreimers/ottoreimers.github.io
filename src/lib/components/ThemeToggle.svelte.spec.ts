import { render } from 'vitest-browser-svelte';
import { afterEach, beforeEach, expect, test } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';

const theme = () => document.documentElement.dataset.theme;

beforeEach(() => {
	delete document.documentElement.dataset.theme;
	localStorage.removeItem('theme');
});

afterEach(() => {
	// Undo the per-test stub so the prototype's startViewTransition is used again.
	delete (document as { startViewTransition?: unknown }).startViewTransition;
});

test('starts in dark mode and offers to switch to light', async () => {
	const screen = await render(ThemeToggle);

	await expect.element(screen.getByRole('button', { name: 'Byt till ljust läge' })).toBeVisible();
	expect(theme()).toBeUndefined();
});

test('clicking switches the document to light mode and remembers it', async () => {
	const screen = await render(ThemeToggle);

	await screen.getByRole('button', { name: 'Byt till ljust läge' }).click();

	await expect.poll(theme).toBe('light');
	expect(localStorage.getItem('theme')).toBe('light');
	await expect.element(screen.getByRole('button', { name: 'Byt till mörkt läge' })).toBeVisible();
});

test('clicking twice returns to dark mode', async () => {
	const screen = await render(ThemeToggle);

	await screen.getByRole('button', { name: 'Byt till ljust läge' }).click();
	await screen.getByRole('button', { name: 'Byt till mörkt läge' }).click();

	await expect.poll(theme).toBeUndefined();
	expect(localStorage.getItem('theme')).toBe('dark');
});

test('runs the switch inside a view transition when the browser supports it', async () => {
	let transitions = 0;
	const original = Document.prototype.startViewTransition;
	Object.assign(document, {
		startViewTransition(update: () => Promise<void>) {
			transitions++;
			return original.call(document, update);
		}
	});
	const screen = await render(ThemeToggle);

	await screen.getByRole('button', { name: 'Byt till ljust läge' }).click();

	await expect.poll(theme).toBe('light');
	expect(transitions).toBe(1);
});

test('still switches instantly when view transitions are unsupported', async () => {
	Object.assign(document, { startViewTransition: undefined });
	const screen = await render(ThemeToggle);

	await screen.getByRole('button', { name: 'Byt till ljust läge' }).click();

	expect(theme()).toBe('light');
});

test('respects a light theme already applied to the document', async () => {
	document.documentElement.dataset.theme = 'light';

	const screen = await render(ThemeToggle);

	await expect.element(screen.getByRole('button', { name: 'Byt till mörkt läge' })).toBeVisible();
});
