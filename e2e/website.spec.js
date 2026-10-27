const { test, expect } = require('@playwright/test');

test.describe('Midnight Signal Hero & Website Suite', () => {
  // 1. Homepage Hero Tests (Midnight Signal)
  test('Homepage hero renders with Midnight Signal layout, typography, and particles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Title check
    await expect(page).toHaveTitle(/Sri Digital Studio|Web Development|Performance Marketing/i);

    // Eyebrow label with magic star icon & theme blue text
    const eyebrow = page.locator('text=WEB DEVELOPMENT • PAID ADS • AI AUTOMATION SYSTEMS');
    await expect(eyebrow).toBeVisible();
    await expect(eyebrow).toHaveClass(/text-\[\#00B8F0\]/);

    // Centered two-line headline
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Grow Your Business.');
    await expect(h1).toContainText('Automate What Comes Next.');

    // Electric cyan highlighted word "Automate"
    const cyanWord = page.locator('h1 span.text-\\[\\#00B8F0\\]');
    await expect(cyanWord).toBeVisible();
    await expect(cyanWord).toHaveText('Automate');

    // SEO-optimized supporting copy
    const supportingText = page.locator(
      'text=We engineer high-performance custom websites'
    );
    await expect(supportingText).toBeVisible();

    // Two CTA buttons
    const primaryCta = page.getByRole('link', { name: /Start a Project/i });
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute('href', '/contact');

    const secondaryCta = page.getByRole('link', { name: /Explore Services/i });
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute('href', '/services');

    // Particle canvas background
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Transparent header at page open
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/bg-transparent/);

    // Navigation links with WordPress-style hover and 14px-15px font size
    await expect(header.getByText('HOME')).toBeVisible();
    await expect(header.getByText('SERVICES')).toBeVisible();
    await expect(header.getByText('BLOGS')).toBeVisible();
    await expect(header.getByText('ABOUT')).toBeVisible();
    await expect(header.getByText('CONTACT')).toBeVisible();
    await expect(header.getByRole('link', { name: /Let's Talk/i }).first()).toBeVisible();

    // Footer is present on homepage
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('All rights reserved');

    // Scroll page down and dispatch scroll event to verify sticky white header appears
    await page.evaluate(() => {
      window.scrollTo(0, 100);
      window.dispatchEvent(new Event('scroll'));
    });
    await expect(header).toHaveClass(/bg-white\/95/);
  });

  // 2. Services Overview
  test('Services overview page renders', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/Services/i);
    await expect(page.locator('h1')).toHaveText('Services');
  });

  // 3. Individual Service Pages
  const services = [
    { slug: 'website-design', title: 'Website Design & Development' },
    { slug: 'meta-ads', title: 'Meta Ads Management' },
    { slug: 'google-ads', title: 'Google Ads Management' },
    { slug: 'ai-automation', title: 'AI Automation & Chatbots' },
    { slug: 'graphic-design', title: 'Graphic Design & Brand Identity' },
    { slug: 'ai-video', title: 'AI Video Generation' },
  ];

  for (const s of services) {
    test(`Service page /services/${s.slug} renders`, async ({ page }) => {
      await page.goto(`/services/${s.slug}`);
      await expect(page).toHaveTitle(new RegExp(s.slug.replace('-', ' '), 'i'));
      await expect(page.locator('h1')).toHaveText(s.title);
    });
  }

  // 4. Blogs Page
  test('Blogs page renders', async ({ page }) => {
    await page.goto('/blogs');
    await expect(page).toHaveTitle(/Blogs/i);
    await expect(page.locator('h1')).toHaveText('Blogs');
  });

  // 5. Portfolio Page
  test('Portfolio page renders', async ({ page }) => {
    await page.goto('/portfolio');
    await expect(page).toHaveTitle(/Portfolio/i);
    await expect(page.locator('h1')).toHaveText('Portfolio');
  });

  // 6. About Page
  test('About page renders', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/i);
    await expect(page.locator('h1')).toHaveText('About Us');
  });

  // 7. Contact Page
  test('Contact page renders', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/i);
    await expect(page.locator('h1')).toHaveText('Contact');
  });

  // 8. Privacy Policy Page
  test('Privacy policy renders', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page).toHaveTitle(/Privacy Policy/i);
    await expect(page.locator('h1')).toHaveText('Privacy Policy');
  });

  // 9. Mobile Navigation Drawer Test
  test('Mobile viewport displays toggleable menu with navigation links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();
    await expect(page.locator('#mobile-navigation')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#mobile-navigation').getByText('HOME')).toBeVisible();
    await expect(page.locator('#mobile-navigation').getByText('SERVICES')).toBeVisible();
    await expect(page.locator('#mobile-navigation').getByText('BLOGS')).toBeVisible();
    await expect(page.locator('#mobile-navigation').getByText('ABOUT')).toBeVisible();
    await expect(page.locator('#mobile-navigation').getByText('CONTACT')).toBeVisible();

    // Close menu
    const closeButton = page.locator('button[aria-label="Close menu"]');
    await closeButton.click();
    await expect(page.locator('#mobile-navigation')).not.toBeVisible();
  });

  // 10. SEO & Robots / Sitemap
  test('Sitemap.xml and robots.txt are accessible and valid', async ({ request }) => {
    const sitemapRes = await request.get('/sitemap.xml');
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain('<urlset');

    const robotsRes = await request.get('/robots.txt');
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText.toLowerCase()).toContain('user-agent: *');
  });
});
