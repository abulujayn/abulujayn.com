import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import vercel from '@astrojs/vercel';

import remarkArabic from './src/plugins/remarkArabic';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkArabic],
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkArabic],
    }),
  ],
  adapter: vercel(),
});
