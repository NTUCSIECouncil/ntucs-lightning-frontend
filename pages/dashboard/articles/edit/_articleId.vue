<template>
  <div>
    <no-ssr>
      <b-container v-if="article">
        <b-row>
          <b-col lg="9">
            <articleEditEditor
              v-bind:article="article"
            />
          </b-col>
          <b-col lg="3">
            <articleEditConfig
              v-bind:article="article"
            />
          </b-col>
        </b-row>
      </b-container>
    </no-ssr>
  </div>
</template>

<script>
import articleEditEditor from '@/components/dashboard/articles/edit/articleEditEditor'
import articleEditConfig from '@/components/dashboard/articles/edit/articleEditConfig'

export default {
  middleware: [
    'authRequired',
    'authRequiredRoleOrgUser'
  ],
  name: 'dashboardArticleNewPage',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle () {
      const articleId = this.$route.params.articleId
      this.$axios.get(`/articles/content/me/${articleId}`, {
          headers: {
            authorization: this.$storage.getLocalStorage('accessToken')
          }
        })
        .then(response => {
          const data = response.data
          this.article = data.data
        })
        .catch(e => {
          
        })
    }
  },
  mounted () {
    this.getArticle()
  },
  components: {
    articleEditEditor,
    articleEditConfig
  }
}
</script>

<style scoped>
</style>

