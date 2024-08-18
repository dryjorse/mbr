import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/chwm",
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
});

