import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import markdownIt from 'markdown-it';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

const parser = new markdownIt();

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      const body = typeof post.body === 'string' ? post.body : '';
      const renderedBody = parser.render(body);
      const sanitized = sanitizeHtml(renderedBody, { allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']) });
      return {
        link: `/posts/${post.id}/`,
        content: sanitized,
        ...post.data,
      }
    }),
  });
}
