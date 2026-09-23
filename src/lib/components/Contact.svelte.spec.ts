import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import Contact from './Contact.svelte';

const links = [
	{ kind: 'email' as const, label: 'otto@example.se', href: 'mailto:otto@example.se' },
	{ kind: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/otto' }
];

test('renders a contact link with its href', async () => {
	const screen = await render(Contact, { name: 'Otto Reimers', links });

	const link = screen.getByRole('link', { name: /LinkedIn/ });
	await expect.element(link).toBeVisible();
	await expect.element(link).toHaveAttribute('href', 'https://www.linkedin.com/in/otto');
});

test('shows initials when no photo is provided', async () => {
	const screen = await render(Contact, { name: 'Otto Reimers', links });

	await expect.element(screen.getByText('OR')).toBeVisible();
	expect(screen.container.querySelector('img')).toBeNull();
});

test('shows the photo when one is provided', async () => {
	const screen = await render(Contact, { name: 'Otto Reimers', links, photo: '/otto.webp' });

	await expect.element(screen.getByRole('img', { name: 'Otto Reimers' })).toBeVisible();
});
