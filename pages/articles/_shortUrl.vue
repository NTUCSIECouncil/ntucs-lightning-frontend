<template>
  <div>
    <b-container
      fluid
      id="articleCoverPhotoWrap"
    >
      <div
        id="articleCoverPhoto"
        v-bind:style="{ 'background-image': `url(${article.coverPhoto})` }"
      >
      </div>
    </b-container>
    <div class="emptyArea">

    </div>
    <b-container>
      <b-row>
        <h2 id="title">
          {{article.title}}
        </h2>
        <hr />
        <div id="article">
          <p v-html="article.content">
          </p>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'articleDetailPage',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle () {
      let articleShortUrl = this.$route.params.shortUrl
      this.$axios.get(`/articles/${articleShortUrl}`)
        .then(i => {
          let articleData = i.data.data
          this.article = {
            ...articleData,
            content: this.$sanitize(articleData.content)
          }
        })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>

<style scoped>
  #title {
    font-family: 'Noto Serif TC', serif;
    line-height: 1.3em;
  }
  #article {
    font-family: 'Noto Serif TC', serif;
  }
  #articleCoverPhoto {
    min-height: 40vh;

    background-position: center;
  }
  #articleCoverPhotoWrap {
    padding: 0 !important;
    margin: 0;
    margin-top: -20px;
  }
  .emptyArea {
    min-height: 50px;
  }
</style>

