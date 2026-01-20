import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index-no-styles.ts",
			name: "AarkReactModalifyNoStyles",
			formats: ["es", "cjs"],
			fileName: (format) =>
				`index-no-styles.${format === "es" ? "esm" : "cjs"}.js`,
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
				compact: true,
			},
		},
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: [
					"console.log",
					"console.info",
					"console.debug",
					"console.warn",
				],
				passes: 3,
			},
			mangle: {
				toplevel: true,
			},
			format: {
				comments: false,
			},
		},
		sourcemap: false,
		target: "es2020",
		reportCompressedSize: false,
		emptyOutDir: false,
	},
});
