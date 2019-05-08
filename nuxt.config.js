const pkg = require('./package')

module.exports = {
  mode: 'universal',
  server: {
    port: 8000,
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/shards-ui@latest/dist/css/shards.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  plugins: [
    { src: '~/plugins/shardsVue', ssr: false },
    { src: '~/plugins/bootstrap', ssr: false }
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
    extend (config, ctx) {
    }
  }
}
