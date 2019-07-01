<template>
  <div>
    <no-ssr>
      <b-container v-if="Object.values(article).length">
        <b-row>
          <b-col lg="9">
            <div id="readingInfoWrap">
              {{articlesState.dashboard.edit.wordCount}} 字 / {{articlesState.dashboard.edit.estimatedReadingTime}} 分鐘閱讀
              <div class="float-right">
                <d-badge theme="success" v-if="articlesState.dashboard.edit.isUpdated && !articlesState.dashboard.edit.isTyping">已自動儲存</d-badge>
                <d-badge theme="danger" v-if="articlesState.dashboard.edit.isUpdatedError && !articlesState.dashboard.edit.isTyping">儲存失敗</d-badge>
              </div>
            </div>
            <p></p>
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
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      articlesState: 'articles'
    })
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
#readingInfoWrap {
  font-family: 'Noto Serif TC', serif;
  background-color: rgb(240,240,240);
  padding: 15px;
}
</style>

