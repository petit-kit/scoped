// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const add =
  process.env.NODE_ENV === 'development'
    ? {}
    : {
        site: 'https://petit-kit.github.io',
        base: '/scoped/',
        build: {
          assets: 'astro',
        },
      };

// https://astro.build/config
export default defineConfig({
  ...add,
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Poppins',
        cssVariable: '--font-poppins',
      },
    ],
  },
});
