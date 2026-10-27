const { test } = require('@playwright/test');

test('capture desktop and mobile hero screenshots', async ({ page }) => {
  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-results/desktop-hero.png', fullPage: false });

  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-results/mobile-hero.png', fullPage: false });
});
