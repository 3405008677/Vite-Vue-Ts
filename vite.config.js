import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
// 让项目在构建时直接生成压缩文件
import viteCompression from "vite-plugin-compression";
// 可视化
import { visualizer } from "rollup-plugin-visualizer";
import { createProxy } from "./build/vite/proxy";

// 定义resolve
const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

// 配置@路径
const alias = {
  "@": pathResolve("./src/"),
};
let env = undefined;
const viteConfig = defineConfig(({ mode }) => {
  env = loadEnv(mode, process.cwd());
  return {
    publicDir: "public",
    plugins: [
      vue(),
      visualizer(),
      // eslintPlugin({}),
      viteCompression(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias,
      extentsions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    server: {
      host: true,
      port: env.VITE_PORT,
      proxy: createProxy(env.VITE_PROXY),
      strictPort: false, //若端口占用，尝试下一个
    },
    // 打包配置
    build: {
      target: "modules", //兼容性
      reportCompressedSize: true, //启用gzip压缩大小报告-可关闭
      minify: "sebuild", //混淆器
      sourcemap: false,
    },
  };
});

export default viteConfig;
