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
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"react-dom/client",
				/^react\/.*/,
				/^react-dom\/.*/,
			],
			output: {
				exports: "named",
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "ReactJSXRuntime",
					"react-dom/client": "ReactDOMClient",
				},
			},
		},
		minify: "terser",
		sourcemap: false,
		target: "es2015",
		cssCodeSplit: false,
	},
});
