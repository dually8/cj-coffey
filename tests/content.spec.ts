import { expect, test } from '@playwright/test';

test('articles retain heading links, contents, and highlighted code', async ({ page }) => {
  await page.goto('/posts/my-astro-experience/', { waitUntil: 'domcontentloaded' });
  const heading = page.getByRole('heading', { name: 'TLDR', exact: true });
  await expect(heading).toHaveAttribute('id', 'tldr');
  await expect(heading.getByRole('link', { name: 'TLDR', exact: true })).toHaveAttribute('href', '#tldr');
  await expect(page.locator('h2#contents + ul a[href="#why-a-new-site"]')).toBeVisible();

  await page.goto('/posts/new-stuff-i-want-to-talk-about/', { waitUntil: 'domcontentloaded' });
  const code = page.locator('pre code').filter({ hasText: 'function sum' }).first();
  await expect(code).toContainText('console.log(sum(1,2))');
  expect(await code.locator('span[style*="color"]').count()).toBeGreaterThan(0);
});

test('RSS contains ordered full posts with sanitized HTML', async ({ page, request }) => {
  const response = await request.get('/rss.xml');
  expect(response.ok()).toBeTruthy();
  const feed = await page.evaluate(
    (xml) => {
      const document = new DOMParser().parseFromString(xml, 'application/xml');
      if (document.querySelector('parsererror')) throw new Error('RSS is not valid XML');
      return [...document.querySelectorAll('item')].map((item) => {
        const content = item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent ?? '';
        const html = new DOMParser().parseFromString(content, 'text/html');
        const attributes = [...html.querySelectorAll('*')].flatMap((element) => [...element.attributes]);
        return {
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
          date: item.querySelector('pubDate')?.textContent ?? '',
          text: html.body.textContent,
          unsafeElements: html.querySelectorAll('script, iframe, object, embed').length,
          unsafeAttributes: attributes.filter((attribute) => /^on/i.test(attribute.name)).length,
          unsafeUrls: attributes.filter(
            (attribute) => /^(href|src)$/i.test(attribute.name) && /^\s*javascript:/i.test(attribute.value),
          ).length,
          images: html.querySelectorAll('img').length,
        };
      });
    },
    await response.text(),
  );

  expect(feed.length).toBeGreaterThan(0);
  const dates = feed.map((item) => Date.parse(item.date));
  expect(dates.every(Number.isFinite)).toBeTruthy();
  expect(dates).toEqual([...dates].sort((a, b) => b - a));
  expect(new Set(feed.map((item) => item.link)).size).toBe(feed.length);
  const article = feed.find((item) => item.title === 'My Astro Experience');
  expect(article?.link).toBe('https://cjcoffey.com/posts/my-astro-experience/');
  expect(article?.text).toContain('Why a new site?');
  expect(feed.some((item) => item.images > 0)).toBeTruthy();
  for (const item of feed) {
    expect(item.unsafeElements, item.link ?? '').toBe(0);
    expect(item.unsafeAttributes, item.link ?? '').toBe(0);
    expect(item.unsafeUrls, item.link ?? '').toBe(0);
  }
});

test('sitemap contains public routes and excludes resume and links', async ({ page, request }) => {
  const indexResponse = await request.get('/sitemap-index.xml');
  expect(indexResponse.ok()).toBeTruthy();
  const sitemapPaths = await page.evaluate(
    (xml) => {
      const document = new DOMParser().parseFromString(xml, 'application/xml');
      if (document.querySelector('parsererror')) throw new Error('Sitemap index is not valid XML');
      return [...document.querySelectorAll('sitemap > loc')].map((location) => location.textContent!);
    },
    await indexResponse.text(),
  );
  expect(sitemapPaths.length).toBeGreaterThan(0);

  const locations: string[] = [];
  for (const sitemap of sitemapPaths) {
    // Resolve only the path against the local preview; never request the deployed site.
    const response = await request.get(new URL(sitemap).pathname);
    expect(response.ok()).toBeTruthy();
    locations.push(
      ...(await page.evaluate(
        (xml) => {
          const document = new DOMParser().parseFromString(xml, 'application/xml');
          if (document.querySelector('parsererror')) throw new Error('Sitemap is not valid XML');
          return [...document.querySelectorAll('url > loc')].map((location) => location.textContent!);
        },
        await response.text(),
      )),
    );
  }

  expect(locations).toContain('https://cjcoffey.com/');
  expect(locations).toContain('https://cjcoffey.com/posts/');
  expect(locations).toContain('https://cjcoffey.com/posts/my-astro-experience/');
  expect(locations).not.toContain('https://cjcoffey.com/resume/');
  expect(locations).not.toContain('https://cjcoffey.com/links/');
  expect(new Set(locations).size).toBe(locations.length);
});
