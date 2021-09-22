<template>
  <div>
    <div id="readingInfoWrap">
      {{ articlesState.dashboard.edit.wordCount }} 字 /
      {{ articlesState.dashboard.edit.estimatedReadingTime }} 分鐘閱讀
    </div>
    <articleEditEditor v-bind:article="article" /><articleEditConfig
      v-bind:article="article"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import articleEditEditor from "@/components/dashboard/articles/edit/articleEditEditor";
import articleEditConfig from "@/components/dashboard/articles/edit/articleEditConfig";

export default {
  middleware: ["authRequired", "authRequiredRoleOrgUser"],
  name: "dashboardArticleNewPage",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState({
      articlesState: "articles",
    }),
  },
  methods: {
    getArticle() {
      const articleId = this.$route.params.articleId;
      this.$axios
        .get(`/articles/content/me/${articleId}`, {
          headers: {
            authorization: this.$storage.getLocalStorage("accessToken"),
          },
        })
        .then((response) => {
          const data = response.data;
          this.article = data.data;
        })
        .catch((e) => {});
    },
  },
  mounted() {
    this.getArticle();
  },
  components: {
    articleEditEditor,
    articleEditConfig,
  },
};
</script>

<style scoped>
#readingInfoWrap {
  font-family: "Noto Serif TC", serif;
  background-color: rgb(240, 240, 240);
  padding: 15px;
}
</style>

