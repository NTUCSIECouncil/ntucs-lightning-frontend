<template>
  <div>
    <no-ssr>
      <b-container fluid id="featuredSwiperWrap">
        <featuredSwiper v-bind:articles="articleList" />
      </b-container>
      <b-container>
        <h3 id="typeTitle">全部文章</h3>
        <b-row>
          <b-col
            lg="3"
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
              <div class="cardImage">
                <d-card-img :src="article.coverPhoto" top/>
              </div>
              <d-card-body>
                <span id="tag">＃{{ article.tag ? article.tag.name : '未分類文章' }}</span>
                <h5 id="card-title">
                  {{article.title}}
                </h5>
                <p>
                  {{article.intro}}
                </p>
                <p></p>
              </d-card-body>
              <d-card-footer>
                <img 
                  :src="article.organization.profilePhoto" 
                  class="img-fluid rounded-circle"
                  width="10%"
                />
                &nbsp;
                {{article.organization.name}} 
              </d-card-footer>
            </d-card>
          </b-col>
        </b-row>
      </b-container>
    </no-ssr>
  </div>
</template>

<script>
import featuredSwiper from '@/components/articles/index/featuredSwiper'

export default {
  name: 'articlesPage',
  metaInfo: {
    title: 'NTU CSIE Council 臺大資工系學會',
    titleTemplate: null
  },
  data () {
    return {
      articleList: []
    }
  },
  methods: {
    getArticles () {
      const tag = this.$route.query.tag
      const params = {}
      if (tag) {
        params.tag = tag
      }
      this.$axios.get(`/articles/all`, {
        params
      })
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
    font-size: 1.2rem;
    line-height: 1.3rem;
    letter-spacing: 0.2rem;
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
    cursor: pointer;
  }
  #cardWrap > .card {
    min-height: 350px;
    width: 100%;
    position: relative;
  }
  #cardWrap > .card > .cardImage > img {
    max-height: 12rem;
    min-height: 12rem;
    width: 100%;
  }
  @media only screen and (max-width: 576px) {
    #cardWrap > .card > .cardImage > img {
      max-height: 15rem;
      min-height: 15rem;
      width: 100%;
    }
  }
  #accessToFullArticleButton {
    position: absolute;
    margin-bottom: 30px;
    bottom: 0;
  }
  #featuredSwiperWrap {
    padding: 0;
    margin-top: -10px;
  }
</style>

