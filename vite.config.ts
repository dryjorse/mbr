import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
  manifest: {
    name: "My Awesome App",
    short_name: "MyApp",
    description: "My Awesome App description",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/chwm",
  // @ts-ignore
  plugins: [react(), VitePWA(manifestForPlugin)],
  server: {
    host: "localhost",
    port: 3000,
  },
});
