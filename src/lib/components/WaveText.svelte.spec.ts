import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import WaveText from './WaveText.svelte';

test('exposes the text once to assistive tech and hides the letter spans', async () => {
	const screen = await render(WaveText, { text: 'LinkedIn', playing: false });

	const letters = screen.container.querySelectorAll('.letter');
	expect(letters).toHaveLength('LinkedIn'.length);
	expect(letters[0].closest('[aria-hidden="true"]')).not.toBeNull();
	expect(screen.container.querySelector('.sr-only')?.textContent).toBe('LinkedIn');
});

test('letters only carry the wave class while playing', async () => {
	const screen = await render(WaveText, { text: 'Hej', playing: false });
	expect(screen.container.querySelectorAll('.wave')).toHaveLength(0);

	await screen.rerender({ text: 'Hej', playing: true });

	expect(screen.container.querySelectorAll('.wave')).toHaveLength(3);
});

test('calls onend once the last letter has finished waving', async () => {
	let ended = 0;
	await render(WaveText, { text: 'Hej', playing: true, onend: () => ended++ });

	await expect.poll(() => ended, { timeout: 3000 }).toBe(1);
});
