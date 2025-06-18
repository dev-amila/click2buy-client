import { defineConfig } from 'vite';
import { qwikVite } from '@qwik.dev/core/optimizer';
import { qwikRouter } from '@qwik.dev/router/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    ssr: {
      target: 'webworker',
    },
    build: {
      sourcemap: false, // No source maps for production
      target: 'esnext',
      minify: true, // Use default esbuild minifier
    },
    esbuild: {
      drop: ['console', 'debugger'], // Remove console.log/debugger in production
    },
    plugins: [qwikRouter(), qwikVite(), tsconfigPaths()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
