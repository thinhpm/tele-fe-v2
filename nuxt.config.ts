import { name, version } from './package.json'
const buidMode = process.env.NODE_ENV || 'development'

const configBaseName = process ? (process.env.CONFIG_FILE || 'local') : 'local'
const envSet = require(`./config/env.${configBaseName}.ts`)

const dateNow = new Date()
const buildDate = configBaseName + ':' + dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + '-' + dateNow.getHours() + '-' + dateNow.getMinutes()

const baseUrl = envSet.baseOrigin + envSet.basePath
console.log('--------------------------------------')
console.log(`${name} をビルドします...`)
console.log(`NODE_ENV: ${buidMode}`)
console.log(`config file path:: ${`./config/env.${configBaseName}.ts`}`)
console.log(`baseUrl: ${baseUrl}`)
console.log('--------------------------------------')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  ssr: false,
  srcDir: 'src/',

  typescript: {
    shim: false, // TypeScript Vue Plugin (Volar) を利用するため
    strict: false, // 型チェックが厳格
    typeCheck: false, // 開発時から型チェックを有効
    // tsConfig: {
    //   types: ['./src/types/index.d.ts'],
    // }
  },

  runtimeConfig: {
    public: {
      CONFIG_FILE: configBaseName,
      version,
      baseOrigin: envSet.baseOrigin,
      basePath: envSet.basePath,
      baseUrl,
      apiUrl: envSet.apiUrl,
      staticUrl: envSet.staticUrl,
      gtmId: envSet.gtmId,
    },
  },

  spaLoadingTemplate: false,

  experimental: {
    headNext: true,
  },

  app: {
    baseURL: envSet.basePath,
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: 'Concrete',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=yes' },
        { name: 'version', content: version },
        { name: 'build-date', content: buildDate },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'todo: description' },
        { name: 'copyright', content: 'todo: Copyright ©  All rights reserved.' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: buidMode === 'development' ? `${envSet.basePath}favicon_development.ico` : `${envSet.basePath}favicon.ico`,
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Ubuntu:wght@400;700&display=swap',
          as: 'style',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Staatliches&display=swap',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/x-icon',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/android-chrome-192×192.png',
          sizes: '192x192',
        },
      ],
    },
    pageTransition: false,
  },

  imports: {
    dirs: ['stores'],
  },

  modules: [
    '@nuxt/devtools',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@pinia/nuxt',
  ],

  // @ts-ignore
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
    defaultTimezone: 'Asia/Tokyo',
    plugins: ['timezone', 'LocalizedFormat', 'isBetween'],
  },

  pinia: {
    autoImports: [
      'defineStore',
      'acceptHMRUpdate',
      'storeToRefs',
    ],
  },

  css: [
    '@/assets/scss/main.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "sass:string";
            @import "@/assets/scss/colors.scss";
            @import "@/assets/scss/variable.scss";
          `,
        },
      },
    },
    esbuild: {
      // build時に、console.errorは残し他削除
      pure: ['console.log', 'console.info', 'console.warn'],
    },

    server: {
      hmr: {
        port: 24670,
        clientPort: 24670,
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },
})
