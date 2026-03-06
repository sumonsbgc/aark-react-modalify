import { defineConfig } from "tsup";
import { rename } from "fs/promises";

export default defineConfig([
	// ── Main bundle (ESM + CJS + CSS) ─────────────────────────────────────────
	{
		entry: { index: "src/index.ts" },
		format: ["esm", "cjs"],
		dts: true,
		tsconfig: "tsconfig.lib.json",
		external: ["react", "react-dom"],
		minify: true,
		clean: true,
		target: "es2020",
		outDir: "dist",
		// Keep the same filenames as the previous build
		outExtension: ({ format }: { format: string }) => ({
			js: `.${format === "esm" ? "esm" : "cjs"}.js`,
		}),
		// tsup/esbuild bundles CSS @import chains into dist/index.css.
		// Rename it to the expected public filename.
		async onSuccess() {
			try {
				await rename("dist/index.css", "dist/aark-react-modalify.css");
			} catch {
				// CSS may not be emitted if esbuild skips it (rare)
			}
		},
	},

	// ── No-styles bundle (JS only, no CSS) ────────────────────────────────────
	{
		entry: { "index-no-styles": "src/index-no-styles.ts" },
		format: ["esm", "cjs"],
		dts: true,
		tsconfig: "tsconfig.lib.json",
		external: ["react", "react-dom"],
		minify: true,
		target: "es2020",
		outDir: "dist",
		outExtension: ({ format }: { format: string }) => ({
			js: `.${format === "esm" ? "esm" : "cjs"}.js`,
		}),
	},
]);
