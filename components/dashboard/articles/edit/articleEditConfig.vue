<template>
  <div>
    <d-card>
      <d-card-body>
        <h4>文章設定</h4>
        <hr />
        <b-form>
          <b-form-group label="標題 (10 字為限)" label-for="input-2">
            <b-input
              type="text"
              v-model="title"
              v-on:keyup.native="updateArticle()"
            ></b-input>
          </b-form-group>

          <b-form-group label="文章網址" label-for="input-3">
            <b-input
              placeholder="A Change to get better"
              type="text"
              v-model="shortUrl"
              v-on:keyup.native="updateArticle()"
            ></b-input>
          </b-form-group>

          <b-form-group label="縮圖網址" label-for="">
            <b-input
              type="text"
              v-model="coverPhoto"
              v-on:keyup.native="updateArticle()"
            ></b-input>
          </b-form-group>

          <b-form-group label="簡介 (10 字為限)">
            <b-form-textarea
              v-model="intro"
              placeholder=""
              rows="2"
              max-rows="2"
              v-on:keyup.native="updateArticle()"
            >
            </b-form-textarea>
          </b-form-group>

          <span>Tag</span>
          <b-form-select
            v-model="selectedTag"
            :options="tags"
            v-on:click.native="updateArticle()"
          ></b-form-select>

          <p></p>

          <d-button 
            block-level 
            theme="primary"
            id="submitToReview"
            v-on:click="submitToReview()"
          >
            發佈文章
          </d-button>

          <d-popover
            target="submitToReview"
            :triggers="['hover']"
            v-on:click.prevent="submitToReview()"
          >
            點擊之後將會進入我們的文章審查程序。🚀
          </d-popover>

          <br />

          <d-button block-level theme="light" v-on:click.prevent="updateArticle('direct')">
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
      title: this.article.title || '',
      shortUrl: this.article.shortUrl || '',
      coverPhoto: this.article.coverPhoto || '',
      intro: this.article.intro || '',
      selectedTag: this.article.tagId || '',
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
    },
    submitToReview () {
    },
    updateArticle (type) {
      // SET Typing Status to True, to hide saved badge.
      this.$store.commit('articles/setTypingStatus', true)

      const articleId = this.$route.params.articleId
      const updateArticleData = {
        title: this.title,
        shortUrl: this.shortUrl,
        coverPhoto: this.coverPhoto,
        tagId: this.selectedTag,
        intro: this.intro,

        articleId
      }
      if (this.typingTimer) {
        clearTimeout(this.typingTimer)
          this.typingTimer = null
      }

      const doUpdate = () => {
        this.$store.dispatch('articles/updateArticle', updateArticleData)
        this.$store.commit('articles/setTypingStatus', false)
      }

      this.typingTimer = setTimeout(() => {
        doUpdate()
      }, 3000)

      if (type === 'direct') {
        doUpdate()
      }
    }
  },
  mounted () {
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

