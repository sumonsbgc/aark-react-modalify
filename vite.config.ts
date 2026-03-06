import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev server only — library build is handled by tsup
export default defineConfig({
	plugins: [react()],
});
