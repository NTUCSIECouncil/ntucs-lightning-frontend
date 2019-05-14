<template>
  <div>
    <b-container>
      <div>
        <h3>我的文章</h3>
      </div>
      <b-list-group>
        <b-list-group-item 
          class="flex-column align-items-start rounded-0"
          v-for="article in articleList"
          v-bind:key="article.id"
          :href="`/articles/${article.shortUrl}`"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
              {{article.title}}
            </h5>
            <d-badge pill theme="success" v-if="article.isPublished">已發佈</d-badge>
            <d-badge pill theme="danger" v-if="article.isRequestChanged">請求變更</d-badge>
            <d-badge pill theme="primary" v-if="article.isRequestReviewed">已送審核</d-badge>
            <d-badge pill theme="info" v-if="article.isDraft">草稿</d-badge>
          </div>

          <br />

          <p class="mb-1">
            {{article.intro}}
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
export default {
  middleware: 'authRequired',
  name: 'dashboardArticles',
  data () {
    return {
      articleList: []
    }
  },
  methods: {
    getMyArticles () {
      this.$axios.get('/articles/me', {
        headers: {
          authorization: this.$storage.getLocalStorage('accessToken')
        }
      }).then(i => {
        let articleList = i.data.data
        this.articleList = articleList
      })
    }
  },
  mounted() {
    this.getMyArticles()
  },
  components: {
  }
}
</script>

