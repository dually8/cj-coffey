import rss, { rssSchema } from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection, z } from 'astro:content';
import markdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

type RssFeed = z.infer<typeof rssSchema>;

const parser = new markdownIt();
export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts
      .map((post) => {
        const body = typeof post.body === 'string' ? post.body : '';
        const renderedBody = parser.render(body);
        const sanitized = sanitizeHtml(renderedBody, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        });
        return {
          author: 'CJ Coffey',
          categories: post.data.tags,
          content: sanitized,
          description: post.data.subtitle,
          link: `/posts/${post.id}/`,
          pubDate: post.data.date,
          title: post.data.title,
        } as RssFeed;
      })
      .sort((a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0)),
  });
}
