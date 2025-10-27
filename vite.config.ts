import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { createProxy } from './build/proxy'
import { wrapperEnv, pathResolve } from './build/utils'
import UnoCSS from 'unocss/vite'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import mkcert from 'vite-plugin-mkcert'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  // 加载 vite 的环境变量 env
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const config: UserConfig = {}

  defaultModel(config)

  if (command === 'serve') {
    return developmentModel(config)
  } else if (command === 'build') {
    return productionModel(config)
  }

  /**
   * 默认模式
   * @param config
   * @returns
   */
  function defaultModel(config: UserConfig): UserConfig {
    config.root = root //项目根目录
    config.base = viteEnv.VITE_PUBLIC_PATH //公共路径
    // 路径别名
    config.resolve = {
      alias: [
        { find: /@\//, replacement: pathResolve('src') + '/' },
        { find: /#\//, replacement: pathResolve('types') + '/' },
      ],
    }

    config.plugins = [
      vue(), // 解析 Vue

      // 自动导入
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: pathResolve('types/AutoImportVue.d.ts'),
      }),

      // 自动导入
      Components({
        dts: pathResolve('types/AutoImportElement.d.ts'),
        resolvers: [ElementPlusResolver()],
      }),

      UnoCSS({
        configFile: '/build/uno.config.ts',
      }),
    ]

    // 开启本地https证书
    if (viteEnv.VITE_HTTPS) {
      config.plugins.push(mkcert())
    }

    config.css = {
      // 适合只引入scss变量，不适合全局样式
      preprocessorOptions: {
        scss: { additionalData: '@use "@/style/variables.scss";' },
      },
    }

    return config
  }

  /**
   * 开发环境
   * @param config
   * @returns
   */
  function developmentModel(config: UserConfig): UserConfig {
    config.server = {
      host: true,
      port: viteEnv.VITE_PORT,
      proxy: createProxy(viteEnv.VITE_PROXY, viteEnv.VITE_WS_PROXY),
      strictPort: false,
    }

    return config
  }

  /**
   * 线上环境
   * @param config
   * @returns
   */
  function productionModel(config: UserConfig): UserConfig {
    //打包引用压缩方法，服务器需要开启gzip服务，如nginx配置：location / { ...; gzip_static on; }
    config.plugins.push(
      compression({
        threshold: 10240, //压缩前最小体积限制，单位Byte，这里大于100KB才会被压缩
        algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        minRatio: 0.8, // 设置压缩效果的最小比例阈值
        compressionOptions: { level: 9 }, // 指定 Gzip 压缩的级别  1-9
      }),
    )

    config.plugins.push(
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
      }),
    )

    config.build = {
      outDir: 'dist', // 输出目录
      assetsDir: 'src/assets/', // 静态资源（图片、字体等）的存放目录
      assetsInlineLimit: 4096, // 4KB 以下的资源会被内联到 JS/CSS 中，减少请求数
      target: 'modules', // 针对 ES 模块语法的浏览器构建（现代浏览器）
      copyPublicDir: true, // 复制 public 目录到输出目录
      emptyOutDir: true, // 构建前清空 outDir（谨慎：确保 outDir 仅包含构建产物）
      reportCompressedSize: false, // 关闭压缩大小报告（大型项目可提升构建速度）
      minify: 'esbuild', // 使用 esbuild 压缩（比 terser 更快，压缩率略低）
      sourcemap: false, // 不生成 sourcemap（生产环境通常关闭，保护源码）
      chunkSizeWarningLimit: 2000, ////规定触发警告的 chunk 大小（以 kbs 为单位）  2MB

      // Rollup配置
      rollupOptions: {
        output: {
          chunkFileNames: 'src/js/[name]-[hash].js', // 用于配置非入口的 JS 代码块
          entryFileNames: 'src/js/[name]-[hash].js', // 用于配置入口 JS 文件
          // 用于配置非 JS 资源文件
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'src/css/[name]-[hash].css'
            }
            if (assetInfo.name?.match(/\.(png|jpe?g|gif|svg)$/)) {
              return 'src/images/[name]-[hash][extname]'
            }
            if (assetInfo.name?.match(/\.(woff2?|eot|ttf|otf)$/)) {
              return 'src/fonts/[name]-[hash][extname]'
            }
            return 'src/assets/[name]-[hash][extname]'
          },
          // 代码分割
          manualChunks: {
            // 第三方库单独打包
            'vue-vendor': ['vue', 'vue-router', 'pinia', 'pinia-plugin-persistedstate'],
            'element-plus': ['element-plus'],
            'vxe-table': ['vxe-table'],
            i18n: ['vue-i18n'], // 国际化单独拆分
            axios: ['axios'],
            'vendor-utils': ['vue3-print-nb', 'json-editor-vue', 'jsbarcode', '@vueup/vue-quill'],
          },
        },
      },

      // Terser配置
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE === 'true', // 是否删除所有 console 相关语句
          drop_debugger: true, // 强制删除所有 debugger 调试语句
          pure_funcs: ['console.log', 'console.warn'], // 标记这些函数为 “纯函数”（无副作用）
        },
        // 用于控制压缩后代码的格式
        format: {
          comments: false, // 移除代码中所有注释
        },
      },
    }

    return config
  }
}
