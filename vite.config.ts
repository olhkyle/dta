import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const exclVendors = ['react', 'react-router-dom', 'react-dom'];
const renderChunks = (deps: Record<string, string>) => {
	let chunks = {};
	Object.keys(deps).forEach(key => {
		if (exclVendors.includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					// Reducing the vendor chunk size
					if (id.includes('tslib')) {
						return '@tslib';
					}
					// creating a chunk to react routes deps. Reducing the vendor chunk size
					if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
						return '@react-router';
					}

					if (id.includes('firebase')) {
						return '@firebase';
					}

					if (id.includes('clsx')) {
						return '@clsx';
					}

					if (id.includes('redux-thunk')) {
						return '@redux-thunk';
					}
				},
			},
		},
	},
});
