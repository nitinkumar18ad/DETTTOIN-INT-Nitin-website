import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "vendor-motion";
          if (id.includes("node_modules/gsap")) return "vendor-gsap";
          if (id.includes("node_modules/lenis")) return "vendor-lenis";
          if (id.includes("node_modules/@phosphor-icons")) return "vendor-icons";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "vendor-react";
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
  },
});
