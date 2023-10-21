import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					console.log(id);
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/').pop().split('/')[0];
					}
				},
			},
		},
	},
});
