// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

import cloudflare from '@astrojs/cloudflare';

// The pages are prerendered to static files. Only Keystatic's admin UI
// (/keystatic) and its API (/api/keystatic) run on demand, in a Cloudflare
// Worker, so editors can sign in with Keystatic Cloud on the live site.
//
// `astro dev` skips the Cloudflare adapter and runs in Node instead, because
// Keystatic's local mode (saving straight to files here) needs Node's file
// system, which Cloudflare's runtime doesn't have.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  build: {
    // Emit pioneers/eric-meyer.html rather than pioneers/eric-meyer/index.html,
    // so links between pages also work when the built site is opened from disk
    format: 'file',
    // Inline CSS so the built pages are styled even when opened from disk
    inlineStylesheets: 'always'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), markdoc(), keystatic()],

  // Photos are plain <img> tags from public/, so skip the Cloudflare Images
  // binding, and the site has no Astro sessions, so skip the KV namespace
  adapter: isDev ? undefined : cloudflare({ imageService: 'passthrough' }),
  session: false
});