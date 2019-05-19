<template>
  <div>
    <b-container fluid id="featuredSwiperWrap">
      <featuredSwiper v-bind:articles="articleList" />
    </b-container>
    <b-container>
      <h3 id="typeTitle">全部文章</h3>
      <b-row>
        <b-col
          lg="4"
          md="6"
          sm="6"
          xs="6"
          cols="12"
          id="cardWrap"
          class="d-flex align-items-stretch"
          v-for="article in articleList" 
          v-bind:key="article.id"
        >
          <d-card v-on:click="accessFullArticle(article)">
            <d-card-img :src="article.coverPhoto" top />
            <d-card-body>
              <span id="tag">＃{{article.tag.name || '未分類文章'}}</span>
               <h5 id="card-title">
                 {{article.title}}
               </h5>
               <small>
                 {{article.intro}}
               </small>
               <p></p>
            </d-card-body>
              <d-card-footer>
                <d-btn v-on:click="accessFullArticle(article)">
                  詳細閱讀
                </d-btn>
              </d-card-footer>
          </d-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import featuredSwiper from '@/components/articles/index/featuredSwiper'

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
  components: {
    featuredSwiper
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style scoped>
  #typeTitle {
    padding-top: 50px;
  }
  #card-title {
    font-family: 'Noto Serif TC', serif;
    font-size: 1.2em;
    line-height: 1.3em;
    letter-spacing: 2px;
  }
  .card-body {
    margin-top: -20px;
  }
  #tag {
    color: blue;
    line-height: 2em;
  }
  #cardWrap {
    padding-top: 2em;
  }
  #cardWrap > .card {
    min-height: 350px;
    position: relative;
  }
  #accessToFullArticleButton {
    position: absolute;
    margin-bottom: 30px;
    bottom: 0;
  }
  .card-footer {
    background-color: white;
  }
  #featuredSwiperWrap {
    padding: 0;
    margin-top: -10px;
  }
</style>

