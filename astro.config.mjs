import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://caira.care',
  integrations: [tailwind()],
  trailingSlash: 'never',
});
