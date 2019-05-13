<template>
  <div>
    <b-container fluid id="articleCoverPhotoWrap">
      <articleCoverPhoto v-bind:article="article" />
    </b-container>
    <div class="emptyArea"></div>
    <b-container id="readingWrap">
      <b-row>
        <h5>＃{{article.tag.name}}</h5>
        <articleContent
          v-bind:article="article"
        />
      </b-row>
    </b-container>
    <b-container id="organizationCardWrap" fluid>
      <b-container id="readingWrap">
        <b-row>
          <organizationCard v-bind:article="article" id="organizationCardComponent" />
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import articleCoverPhoto from '@/components/articles/_shortUrl/articleCoverPhoto'
import articleContent from '@/components/articles/_shortUrl/articleContent'
import organizationCard from '@/components/articles/_shortUrl/organizationCard'

export default {
  name: 'articleDetailPage',
  data () {
    return {
      article: {
        tag: {
          name: ''
        },
        organization: {
          name: '',
          school: {
            name: ''
          }
        }
      }
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
  },
  components: {
    articleCoverPhoto,
    articleContent,
    organizationCard
  }
}
</script>

<style scoped>
  #articleCoverPhotoWrap {
    padding: 0 !important;
    margin: 0;
    margin-top: -10px;
  }
  #readingWrap {
    max-width: 45vw;
  }
  #organizationCardComponent {
    min-width: 100%;
  }
  #organizationCardWrap {
    background-color: rgba(240,240,240) !important;
    min-width: 100%;
    min-height: 10vh;
  }
  @media only screen and (max-width: 1140px) {
    #readingWrap {
      max-width: 80vw;
    }
  }
  .emptyArea {
    min-height: 50px;
  }
</style>

