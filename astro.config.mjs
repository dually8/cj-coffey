// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://cjcoffey.com',
  integrations: [mdx(), sitemap({
    filter: filterSitemap,
  }), svelte()],
  prefetch: true,
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'dracula',
      },
      wrap: true,
    }
  },
  experimental: {
    svg: true,
  }
});

/**
 * Removes the resume and links pages from the sitemap
 * @param {string} page The page to filter
 * @returns {boolean} Whether or not to include the page in the sitemap
 */
function filterSitemap(page) {
  return page !== 'https://cjcoffey.com/resume/' && page !== 'https://cjcoffey.com/links/';
}
