import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",  // Keep the server accessible on all network interfaces
    port: 3001,  // Keep the custom port setting intact
  },
  plugins: [
    react(), // React plugin for Vite
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Setting alias for the 'src' directory
    },
  },
});
