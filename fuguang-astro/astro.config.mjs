// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkDirective from 'remark-directive';
import remarkDirectiveMapping from './src/plugins/remark-directive-mapping.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkDirective, remarkDirectiveMapping]
    })
  ]
});
