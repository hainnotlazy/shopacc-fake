import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		proxy: {
			"/api": {
				target: "http://server:3000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
