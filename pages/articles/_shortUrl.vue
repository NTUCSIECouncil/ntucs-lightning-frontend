<template>
  <div>
    <no-ssr>
      <div>
        <b-container fluid id="articleCoverPhotoWrap">
          <articleCoverPhoto v-bind:article="article" />
        </b-container>
        <div class="emptyArea"></div>
        <b-container id="readingWrap">
          <b-row>
            <h5 id="tag">＃{{ article.tag ? article.tag.name : '未分類文章' }}</h5>
          </b-row>
          <b-row>
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
    </no-ssr>
  </div>
</template>

<script>
import articleCoverPhoto from '@/components/articles/_shortUrl/articleCoverPhoto'
import articleContent from '@/components/articles/_shortUrl/articleContent'
import organizationCard from '@/components/articles/_shortUrl/organizationCard'

export default {
  name: 'articleDetailPage',
  head () {
    return {
      title: this.articleRaw.title,
      meta: [
        { hid: 'description', name: 'description', content: this.articleRaw.intro },

        { hid: 'og-title', property: 'og:title', content: `${this.articleRaw.title} - 臺大資工系學會` },
        { hid: 'og-description', property: 'og:description', content: this.articleRaw.intro },
        { hid: 'og-image', property: 'og:image', content: this.articleRaw.coverPhoto },
        { hid: 'og-url', property: 'og:url', content: `https://thechanger.me/articles/${this.articleRaw.shortUrl}/` }
      ]
    }
  },
  async asyncData ({ $axios, params, error }) {
    const articleShortUrl = params.shortUrl
    let article = undefined
    try {
      article = await $axios.get(`/articles/content/${articleShortUrl}`)
    } catch (e) {
      error({ statusCode: 404, message: e.message })
      return
    }

    return { articleRaw: article.data.data }
  },
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
      this.article = {
        ...this.articleRaw,
        content: this.$sanitize(this.articleRaw.rawContent)
      }
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
  #tag {
    color: blue;
  }
</style>