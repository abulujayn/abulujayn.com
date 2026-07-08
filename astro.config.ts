import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import vercel from '@astrojs/vercel';

import remarkArabicTransliteration from './src/plugins/remarkArabic';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkArabicTransliteration],
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkArabicTransliteration],
    }),
  ],
  adapter: vercel(),
});
