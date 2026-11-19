import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

import fsSite from 'node:fs';
import pathSite from 'node:path';
import type { Plugin as PluginSite } from 'vite';

// Domaine du site, lu au build : SITE_URL (https://hylst.fr par defaut). Il remplace %SITE_URL% dans index.html
// et dans les fichiers publics listes, pour que l'app change de domaine sans toucher au code.
const SITE_URL = (process.env.SITE_URL || 'https://hylst.fr').replace(/\/+$/, '');
const siteUrl = (fichiersPublics: string[]): PluginSite => {
  let outDir = '';
  return {
    name: 'site-url',
    configResolved(config) {
      outDir = pathSite.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL) },
    writeBundle: {
      order: 'pre',
      sequential: true,
      handler() {
        for (const f of fichiersPublics) {
          const p = pathSite.join(outDir, f);
          fsSite.writeFileSync(p, fsSite.readFileSync(p, 'utf8').replaceAll('%SITE_URL%', SITE_URL));
        }
      },
    },
  };
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/guide_maths/',
    plugins: [siteUrl([]),
      react(), 
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: 'Cours_Math',
            dest: ''
          }
        ]
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
        workbox: {
          maximumFileSizeToCacheInBytes: 3000000
        },
        manifest: {
          name: 'Guide Mathématiques Interactif',
          short_name: 'Guide Maths',
          description: 'Plateforme éducative et interactive de mathématiques',
          theme_color: '#4f46e5',
          background_color: '#f8fafc',
          display: 'standalone',
          start_url: '/guide_maths/',
          scope: '/guide_maths/',
          icons: [
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.HYLST_API_KEY': JSON.stringify(env.HYLST_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
