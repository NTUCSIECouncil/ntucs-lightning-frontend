<template>
  <div>
    <b-container>
      <b-row>
        <b-col
          lg="4"
          md="6"
          sm="6"
          xs="6"
          cols="12"
          v-for="article in articleList" 
          v-bind:key="article.id"
        >
          <d-card v-on:click="accessFullArticle(article)">
            <d-card-img :src="article.coverPhoto" top />
            <d-card-body>
               <h5 id="card-title">
                 {{article.title}}
               </h5>
               <p>
                 ＃Tag1 ＃Tag2 ＃Tag3
               </p>
               <p></p>
               <d-btn v-on:click="accessFullArticle(article)">
                 詳細閱讀
               </d-btn>
            </d-card-body>
          </d-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'articlesPage',
  data () {
    return {
      articleList: []
    }
  },
  methods: {
    getArticles () {
      this.$axios.get(`/articles/all`)
        .then(i => {
          let articleList = i.data.data
          this.articleList = articleList
        })
    },
    accessFullArticle (article) {
      this.$router.push(`/articles/${article.shortUrl}`)
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style scoped>
  #card-title {
    font-family: 'Noto Serif TC', serif;
    font-size: 1.2em;
    line-height: 1.3em;
  }
</style>

