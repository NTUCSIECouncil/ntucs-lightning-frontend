<template>
  <div>
    <!--<div id="readingInfoWrap">
      {{ articlesState.dashboard.edit.wordCount }} 字 /
      {{ articlesState.dashboard.edit.estimatedReadingTime }} 分鐘閱讀
    </div>-->
    <articleEditConfig v-bind:article="article" />
    <articleEditEditor v-bind:article="article" />
    <div>
      <button
        v-on:click.prevent="updateArticle('direct')"
        v-if="!articlesState.dashboard.edit.isUpdatedError"
        class="
          inline-block
          text-xl
          md:text-2xl
          font-bold
          p-2
          rounded-lg
          text-white
          bg-secondary
        "
      >
        儲存草稿
      </button>
      <h3 class="text-center">
        <p theme="danger" v-if="articlesState.dashboard.edit.isUpdatedError">
          儲存失敗
        </p>
      </h3>
      <span class="mt-12">
        <button
          v-on:click.prevent="submitToReview()"
          v-if="!articlesState.dashboard.edit.isUpdatedError"
          class="
          float-right
            inline-block
            text-xl
            md:text-2xl
            font-bold
            p-2
            rounded-lg
            text-white
            bg-primary
          "
        >
          {{ submitToReviewText || "送出" }}
        </button>
      </span>
    </div>
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
      submitToReviewText: "",
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
    submitToReview() {
      const articleId = this.$route.params.articleId;

      this.submitToReviewText = "處理中";

      this.$axios
        .post(
          `/articles/request/review/${articleId}`,
          {},
          {
            headers: {
              authorization: this.$storage.getLocalStorage("accessToken"),
            },
          }
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            if (data.result === "success") {
              this.submitToReviewText = "請求成功";
            }
          }
        })
        .catch((error) => {
          this.submitToReviewText = "請求失敗";
        });
    },
    updateArticle(type) {
      // SET Typing Status to True, to hide saved badge.
      this.$store.commit("articles/setTypingStatus", true);

      const articleId = this.$route.params.articleId;
      const updateArticleData = {
        title: this.title,
        shortUrl: this.shortUrl,
        coverPhoto: this.coverPhoto,
        tagId: this.selectedTag,
        intro: this.intro,

        articleId,
      };
      if (this.typingTimer) {
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
      }

      const doUpdate = () => {
        this.$store.dispatch("articles/updateArticle", updateArticleData);
        this.$store.commit("articles/setTypingStatus", false);
      };

      this.typingTimer = setTimeout(() => {
        doUpdate();
      }, 3000);

      if (type === "direct") {
        doUpdate();
      }
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

