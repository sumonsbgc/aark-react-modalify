import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts",
			name: "AarkReactModalify",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format === "es" ? "esm" : "cjs"}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				exports: "named",
			},
		},
	},
});
