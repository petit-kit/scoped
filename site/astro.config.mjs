// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// site: 'https://petit-kit.github.io',
	// base: '/scoped/',
	// build: {
	// 	assets: 'astro',
	// },
	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
		fonts: [{
				provider: fontProviders.google(),
				name: "Poppins",
				cssVariable: "--font-poppins"
		}]
	},
});
