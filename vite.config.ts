import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vitePluginConsoleOverlay from './src/utils/vite-plugin-console-overlay'
import tailwindcss from '@tailwindcss/vite'
import { viteInjectAppLoadingPlugin } from './src/utils/inject-app-loading/index'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      // vitePluginConsoleOverlay(),
      vue(),
      vueJsx(),
      // vueDevTools(),
      tailwindcss(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: './src/types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: './src/types/components.d.ts',
      }),
      viteInjectAppLoadingPlugin(false, {}),
    ],
    server: {
      port: 5199,
      host: '0.0.0.0',
      // /api/login -> {env.VITE_APP_PROXY}/login
      proxy: {
        '/api': {
          target: env.VITE_APP_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      open: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
