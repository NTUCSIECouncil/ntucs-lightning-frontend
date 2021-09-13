require('dotenv').config()

module.exports = {
  telemetry: false,
  mode: 'universal',
  server: {
    port: 4000,
    host: '0.0.0.0'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: '臺大資工系學會',
    titleTemplate: '%s - 臺大資工系學會',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '臺大資工系學會平時會舉辦有趣的聚會、競賽和其他活動，帶你探索大學生活' },

      { hid: 'og-title', property: 'og:title', content: '臺大資工系學會' },
      { hid: 'og-url', property: 'og:url', content: 'https://council.csie.ntu.edu.tw/' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-site_name', property: 'og:site_name', content: '臺大資工系學會' },
      { hid: 'og-description', property: 'og:description', content: '臺大資工系學會平時會舉辦有趣的聚會、競賽和其他活動，帶你探索大學生活' }

    ],
    link: [
      // { rel: 'stylesheet', href: '/cache/bootstrap.min.css' },
      // { rel: 'stylesheet', href: '/cache/shards.min.css' },
      { rel: 'stylesheet', href: '/cache/NotoSerifFont.css' },
      { rel: 'stylesheet', href: '/cache/font-awesome/all.min.css' },
      { rel: 'stylesheet', href: '/cache/medium-editor/medium-editor.min.css' },
      { rel: 'stylesheet', href: '/cache/medium-editor/tim.css' }
    ]
  },
  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: 'black-translucent',
    name: '臺大資工',
    author: 'Max Chou'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#007CFF' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheets/style.css',
    'swiper/dist/css/swiper.css'
  ],

  plugins: [
    // { src: '~/plugins/shardsVue', ssr: false },
    // { src: '~/plugins/bootstrap', ssr: true },
    { src: '~/plugins/vueNotifications', ssr: true },
    { src: '~/plugins/sanitize', ssr: false },
    { src: '~/plugins/mediumEditor', ssr: false },
    { src: '~/plugins/nuxtSwiper', ssr: false },
    { src: '~/plugins/vueGoogleOauth2', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-universal-storage',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/dotenv', {
      filename: '.env'
    }]
  ],
  // Env
  env: {
    googleClientId: process.env.GOOGLE_CLIENT_ID || ''
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://council.csie.ntu.edu.tw:3000/api/v1' : 'https://api.council.csie.ntu.edu.tw/api/v1'
  },

  /*
  ** Build configuration
  */
  build: {
    extend (config, ctx) {
    }
  }
}
