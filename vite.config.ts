import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		minify: true,
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				manualChunks: () => 'app',
				assetFileNames: '[name][extname]'
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
