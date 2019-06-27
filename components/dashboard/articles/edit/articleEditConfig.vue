<template>
  <div>
    <d-card id="">
      <d-card-body>
        <h4>文章設定</h4>
        <hr />
        <b-form @submit.prevent="">
          <b-form-group label="標題 (10 字為限)" label-for="input-2">
            <b-input
              required
              type="text"
              :value="article.title || ''"
            ></b-input>
          </b-form-group>

          <b-form-group label="文章網址" label-for="input-3">
            <b-input
              required
              placeholder="A Change to get better"
              type="text"
              :value="article.shortUrl || ''"
            ></b-input>
          </b-form-group>

          <b-form-group label="縮圖網址" label-for="">
            <b-input
              required
              type="text"
              :value="article.coverPhoto || ''"
            ></b-input>
          </b-form-group>

          <b-form-group label="簡介 (10 字為限)">
            <b-form-textarea
              v-model="intro"
              placeholder=""
              rows="2"
              max-rows="2"
            >
            </b-form-textarea>
          </b-form-group>

          <span>Tag</span>
          <b-form-select v-model="selectedTag" :options="tags"></b-form-select>

          <p></p>

          <d-button block-level theme="primary" type="submit">
            發佈文章
          </d-button>
          <d-button block-level theme="light" type="submit">
            儲存成草稿
          </d-button>

        </b-form>
      </d-card-body>
    </d-card>
  </div>
</template>

<script>
export default {
  name: 'articleEditConfig',
  props: ['article'],
  data () {
    return {
      shortUrl: '',
      selectedTag: '',
      tags: []
    }
  },
  methods: {
    randomShortUrl () {
      let str = Math.random().toString(36).replace('0.', '')
      this.shortUrl = str
    },
    getTags () {
      this.$axios.get('/tags/all')
        .then(i => {
          let data = i.data.data
          this.tags = data.map(tag => {
            return {
              value: tag.tagId,
              text: tag.name
            }
          })
        })
    }
  },
  mounted () {
    this.randomShortUrl()
    this.getTags()
  },
  components: {
  }
}
</script>

<style scoped>
#SearchParameters.in,
#SearchParameters.collapsing {
  display: block !important;
}
</style>

