import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

const isVercel = process.env.VERCEL === "1";
const isGitHubPages =
  process.env.PUBLIC_DEPLOY_TARGET === "github" || process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: 'https://vrrobotics.github.io',
  base: isGitHubPages ? '/vr-robotics-academy' : '/',
  
  integrations: [
    tailwind(),
    react(),
  ],
  adapter: isVercel ? vercel() : undefined,
  
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  
  output: isVercel ? 'server' : 'static',
});
