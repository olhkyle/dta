import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					// Reducing the vendor chunk size
					// creating a chunk to react routes deps. Reducing the vendor chunk size
					if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
						return '@react-router';
					}

					if (id.includes('firebase')) {
						return '@firebase';
					}

					if (id.includes('lodash')) {
						return '@lodash';
					}

					if (id.includes('zod')) {
						return '@zod';
					}
				},
			},
		},
	},
});
