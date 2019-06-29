<template>
  <div>
    <b-container>
      <div id="myArticle-Wrap" class="d-flex w-100">
        <h3 class="mr-auto p-1">我的文章 ({{articleList.length}})</h3>
        <div id="addArticle" class="p-1">
          <d-button
            v-on:click="addArticle()"
          >
            開始寫文！
          </d-button>
        </div>
      </div>

      <div id="noArticle" v-if="!articleList">
        <h3>這裡什麼都沒有ＱＱ</h3>
        <p></p>
        <d-button
          v-on:click="addArticle()"
        >
          開始寫文！
        </d-button>
      </div>
      <b-list-group>
        <b-list-group-item 
          class="flex-column align-items-start rounded-0"
          v-for="article in articleList"
          v-bind:key="article.id"
        >
          <div class="d-flex w-100">
            <h5 class="mr-auto p-1">
              {{article.title}}
            </h5>

            <div class="p-1">
              <d-badge pill theme="success" v-if="article.isPublished">已發佈</d-badge>
              <d-badge pill theme="danger" v-if="article.isRequestChanged">請求變更</d-badge>
              <d-badge pill theme="primary" v-if="article.isReviewed">已審核</d-badge>
              <d-badge pill theme="primary" v-if="article.isRequestReviewed">已送審核</d-badge>
              <d-badge pill theme="info" v-if="article.isDraft">草稿</d-badge>

              <a
                class="btn btn-primary"
                v-if="article.isPublished"
                :href="`/articles/${article.shortUrl}`"
              >查看文章
              </a>
              <a
                class="btn btn-warning"
                v-if="!article.isPublished"
                :href="`/dashboard/articles/edit/${article.articleId}`"
              >編輯文章
              </a>
            </div>
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
    },
    addArticle () {
      this.$store.dispatch('articles/newArticle')
        .then(response => {
          const data = response.data.data
          this.$router.push(`/dashboard/articles/edit/${data.articleId}`)
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
<style scoped>
#noArticle {
  background-color: #F0F0F0;
  padding: 50px;
  text-align: center;
}
#myArticle-Wrap > h3 {
  display: inline;
}
#myArticle-Wrap > #addArticle {
  display: inline;
}
</style>
