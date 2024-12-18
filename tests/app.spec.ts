import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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
  await expect(page.locator('a').filter({ hasText: 'Dev Log Series Part 3 2023-11' })).toBeVisible();
});
