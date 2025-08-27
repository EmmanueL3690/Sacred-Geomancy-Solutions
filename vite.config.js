// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Configure Vite for subpath deployment
export default defineConfig({
  plugins: [react()],
  base: "/Sacred-Geomancy-Solutions/", // 👈 IMPORTANT: matches your repo/project folder
});


