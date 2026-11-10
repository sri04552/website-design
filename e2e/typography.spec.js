const { test, expect } = require('@playwright/test');

test.describe('Typography System Verification', () => {
  test('Verify Homepage Hero typography at desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Hero headline
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    const h1Styles = await h1.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing,
      };
    });

    console.log('Desktop H1 Styles:', h1Styles);
    expect(h1Styles.fontFamily.toLowerCase()).toContain('plus jakarta');
    expect(parseFloat(h1Styles.fontSize)).toBeCloseTo(60, 1);
    expect(parseInt(h1Styles.fontWeight, 10)).toBe(700);
    // letter-spacing approximately -2px
    expect(parseFloat(h1Styles.letterSpacing)).toBeCloseTo(-2, 0.5);

    // 2. Cyan highlighted word
    const cyanWord = h1.locator('span.text-\\[\\#00B8F0\\]');
    const cyanStyles = await cyanWord.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
      };
    });
    console.log('Cyan word styles:', cyanStyles);
    expect(cyanStyles.fontFamily.toLowerCase()).toContain('plus jakarta');
    expect(parseInt(cyanStyles.fontWeight, 10)).toBe(800);

    // 3. Supporting paragraph
    const paragraph = page.locator('section[aria-label="Hero Section"] p');
    const pStyles = await paragraph.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
      };
    });
    console.log('Paragraph styles:', pStyles);
    expect(pStyles.fontFamily.toLowerCase()).toContain('inter');
    expect(parseFloat(pStyles.fontSize)).toBe(18);
    expect(parseInt(pStyles.fontWeight, 10)).toBe(400);

    // 4. Eyebrow label
    const eyebrow = page.locator('section[aria-label="Hero Section"] span.font-mono');
    const eyebrowStyles = await eyebrow.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
      };
    });
    console.log('Eyebrow styles:', eyebrowStyles);
    expect(eyebrowStyles.fontFamily.toLowerCase()).toContain('ibm plex mono');
    expect(parseFloat(eyebrowStyles.fontSize)).toBe(12);
    expect(parseInt(eyebrowStyles.fontWeight, 10)).toBe(500);

    // 5. Navigation links
    const navLink = page.locator('nav[aria-label="Main Navigation"] a:has-text("HOME")');
    const navStyles = await navLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
      };
    });
    console.log('Nav link styles:', navStyles);
    expect(navStyles.fontFamily.toLowerCase()).toContain('inter');
    expect(parseFloat(navStyles.fontSize)).toBe(15);
    expect(parseInt(navStyles.fontWeight, 10)).toBe(600);

    // 6. CTA buttons
    const ctaButton = page.getByRole('link', { name: /Start a Project/i });
    const ctaStyles = await ctaButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
      };
    });
    console.log('CTA button styles:', ctaStyles);
    expect(ctaStyles.fontFamily.toLowerCase()).toContain('inter');
    expect(parseFloat(ctaStyles.fontSize)).toBe(16);
    expect(parseInt(ctaStyles.fontWeight, 10)).toBe(600);

    // Capture desktop screenshot
    await page.screenshot({ path: 'test-results/typography-desktop.png', fullPage: false });
  });

  test('Verify Homepage Hero typography at tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Check no horizontal scrollbar / overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await page.screenshot({ path: 'test-results/typography-tablet.png', fullPage: false });
  });

  test('Verify Homepage Hero typography at mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Check no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await page.screenshot({ path: 'test-results/typography-mobile.png', fullPage: false });
  });
});
