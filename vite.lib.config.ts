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
				compact: true,
				assetFileNames: (assetInfo) => {
					if (assetInfo.names && assetInfo.names[0]?.endsWith(".css")) {
						return "aark-react-modalify.css";
					}
					return assetInfo.names?.[0] || "asset";
				},
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
				unsafe: true,
				unsafe_comps: true,
				unsafe_math: true,
				unsafe_methods: true,
				unsafe_proto: true,
				unsafe_regexp: true,
				reduce_vars: true,
				reduce_funcs: true,
				collapse_vars: true,
				inline: 3,
				hoist_funs: true,
				hoist_vars: true,
				if_return: true,
				join_vars: true,
				loops: true,
				negate_iife: true,
				properties: true,
				sequences: true,
				side_effects: true,
				switches: true,
				top_retain: [],
				typeofs: true,
				unused: true,
				dead_code: true,
				evaluate: true,
				conditionals: true,
				booleans: true,
				keep_fargs: false,
				keep_fnames: false,
			},
			mangle: {
				toplevel: true,
				eval: true,
				safari10: true,
				properties: {
					regex: /^_/,
				},
			},
			format: {
				comments: false,
				semicolons: false,
				shorthand: true,
				beautify: false,
				ecma: 2020,
			},
		},
		sourcemap: false,
		target: "es2020",
		cssCodeSplit: false,
		cssMinify: true,
		reportCompressedSize: false,
	},
});
