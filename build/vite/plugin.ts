import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { pathResolve } from '../utils'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// element
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]
  vitePlugins.push(
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: pathResolve('types/autoImport.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),
  )
  vitePlugins.push(
    Components({
      dts: pathResolve('types/componentsImport.d.ts'),
      resolvers: [ElementPlusResolver()],
    }),
  )
  vitePlugins.push(
    UnoCSS({
      configFile: '/build/uno.config.ts',
    }),
  )
  return vitePlugins
}
