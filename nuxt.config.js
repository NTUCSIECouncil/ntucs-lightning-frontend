const pkg = require('./package')

module.exports = {
  mode: 'universal',
  server: {
    port: 3002,
    host: '0.0.0.0'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'The Changer 改變者',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/shards-ui@latest/dist/css/shards.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Serif+TC' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#007CFF' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheets/style.css'
  ],

  plugins: [
    { src: '~/plugins/shardsVue', ssr: true },
    { src: '~/plugins/bootstrap', ssr: true },
    { src: '~/plugins/vueNotifications', ssr: true },
    { src: '~/plugins/sanitize', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-universal-storage',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://localhost:3000/api/v1'
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
    }
  }
}
