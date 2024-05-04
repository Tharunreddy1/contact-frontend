import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://contact-form-1-9k0o.onrender.com/",
    },
  },
  plugins: [react()],
});
