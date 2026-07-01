import { defineConfig } from 'vite';

export default defineConfig({
  // If deploying to GitHub Pages at https://<USERNAME>.github.io/<REPO>/,
  // set the base to '/<REPO>/'. For example: base: '/assisi-gym-website/'
  // If deploying to a custom domain or Vercel/Netlify, leave base as '/'
  base: '/',
  build: {
    outDir: 'dist',
  }
});
