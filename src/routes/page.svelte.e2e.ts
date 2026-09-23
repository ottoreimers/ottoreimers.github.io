import { expect, test } from '@playwright/test';

test('home page shows the name and every section', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { level: 1, name: 'Otto Reimers' })).toBeVisible();

	for (const title of ['Erfarenhet', 'Utbildning', 'Kompetenser', 'Vid sidan av', 'Kontakt']) {
		await expect(page.getByRole('heading', { level: 2, name: title, exact: true })).toBeVisible();
	}
});

test('theme toggle switches to light mode and survives a reload', async ({ page }) => {
	await page.goto('/');

	await page.getByRole('button', { name: 'Byt till ljust läge' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.getByRole('button', { name: 'Byt till mörkt läge' })).toBeVisible();
});
