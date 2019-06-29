import Vue from 'vue'

if (process.client) {
  const ShardsVue = require('shards-vue')
  Vue.use(ShardsVue)
}
