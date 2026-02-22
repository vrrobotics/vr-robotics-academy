import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: 'https://vrbobotics.github.io',
  base: '/vr-robotics-academy',
  
  integrations: [
    tailwind(),
    react(),
  ],
  
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  
  output: 'static',
  
  vite: {
    ssr: {
      external: ['react-router-dom'],
    },
  },
});