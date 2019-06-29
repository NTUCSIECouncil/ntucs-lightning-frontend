import Vue from 'vue'
import ShardsVue from 'shards-vue'

if (process.client) {
  Vue.use(ShardsVue)
}
