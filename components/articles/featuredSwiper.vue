<template>
  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="article in articleList" v-bind:key="article.articlesId">
          <div v-on:click="accessFullArticle(article)">
            <div class="swiper-image-wrap" v-bind:style="{ 'background-image': `url(${article.coverPhoto})` }">
            </div>
            <div class="swiper-image-text-wrap text-center">
              <h3 class="swiper-image-title">{{article.title}}</h3>
              <p class="swiper-image-intro">{{article.intro}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'featuredSwiper',
  props: ['articles'],
  data () {
    return {
      swiperOption: {
        effect : 'fade',
        loop: true,
        autoHeight: true,
        draggable: false,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        }
      },
      articleList: []
    }
  },
  methods: {
    accessFullArticle (article) {
      this.$router.push(`/articles/${article.shortUrl}`)
    },
    getFeaturedArticles () {
      this.$axios.get(`/articles/all?type=featured`)
        .then(i => {
          let articleList = i.data.data
          this.articleList = articleList
        })
    }
  },
  mounted () {
    this.getFeaturedArticles()
  }
}
</script>

<style scoped>
.swiper-wrapper {
  max-height: 20rem;
  min-height: 20rem;
}
.swiper-image-wrap {
  min-height: 20rem;

  filter: brightness(0.7);
  -webkit-filter:  brightness(0.7);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.swiper-image-title {
  text-shadow: 5px 5px 16px rgba(0,0,0,0.36);
  font-weight: bold;
  color: white;
  letter-spacing: 0.2rem;
}
.swiper-image-text-wrap {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  padding-left: 2.1875rem;
  padding-right: 2.1875rem;
}
.swiper-image-intro {
  text-shadow: 5px 5px 16px rgba(0,0,0,0.36);
  font-weight: bold;
  font-size: 1.2em;
  color: white;
  letter-spacing: 0.1rem;
}
</style>

