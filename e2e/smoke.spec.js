const { test, expect } = require('@playwright/test');

test('smoke test - playwright test runner operates correctly', async ({ page }) => {
  await page.setContent('<h1>Playwright Ready</h1>');
  await expect(page.locator('h1')).toHaveText('Playwright Ready');
});
