import type { APIRoute } from 'astro';

const pages = ['/', '/resources/', '/sources/', '/referencing/', '/learn/', '/about/', '/privacy/'];

export const GET: APIRoute = ({ site }) => {
  const baseURL = site ?? new URL('https://terraresources.github.io');
  const urls = pages
    .map((path) => `<url><loc>${new URL(path, baseURL).href}</loc></url>`)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};
