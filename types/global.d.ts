export {}
declare global {
  declare type Recordable<T = any> = Record<string, T>
  // env 变量类型
  declare interface ViteEnv {
    VITE_PORT: number
    VITE_PROXY: [string, string][]
    VITE_PUBLIC_PATH: string
    VITE_DROP_CONSOLE: boolean
    VITE_HTTPS: boolean
    VITE_GLOB_APP_TITLE: boolean
  }

  // API 返回值类型
  declare interface API_RETURN {
    code: number
    data?: any
    message: string
    messageCode: string
  }
}
declare global {
  const appStore: (typeof import('@/store'))['appStore']
  const userStore: (typeof import('@/store'))['userStore']
}
