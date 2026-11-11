import { test, expect } from '@playwright/test';

test('homepage navigation and archive search', async ({ page }) => {
  await page.goto('/');
  // Confirm all major page elements are visible.
  await expect(page.getByRole('heading', { name: 'Latest Posts' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Archive' })).toBeVisible();
  await expect(page.getByLabel('Toggle light and dark mode')).toBeVisible();
  // Navigate to the archive page.
  await page.getByRole('link', { name: 'Archive' }).click();
  // Confirm search is working
  await expect(page.getByPlaceholder('Search')).toBeVisible();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('devlog');
  await expect(page.locator('h2').filter({ hasText: 'Dev Log Series Part 3' })).toBeVisible();
  await expect(page.locator('h2').filter({ hasText: 'FIRST' })).not.toBeVisible();
  await page.getByPlaceholder('Search').fill('first');
  await expect(page.getByRole('heading', { name: 'FIRST', exact: true })).toBeVisible();
  await expect(page.locator('h2').filter({ hasText: 'Dev Log Series Part 3' })).not.toBeVisible();
});

test('theme selection persists across navigation', async ({ page }) => {
  await page.goto('/');
  const originalTheme = await page.locator('html').getAttribute('data-theme');
  const selectedTheme = originalTheme === 'dark' ? 'light' : 'dark';

  await page.getByRole('button', { name: 'Toggle light and dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', selectedTheme);
  await page.getByRole('link', { name: 'Archive' }).click();
  await expect(page).toHaveURL(/\/posts\/?$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', selectedTheme);
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(selectedTheme);
});
