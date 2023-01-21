import { expect, test } from '@playwright/test';

test('Index page has expected Binder logo', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('a')).toBe('📖 Binder');
});
