<template>
  <div>
    <div>
      <div>
        <h4 class="text-xl md:text-2xl">文章設定</h4>
        <hr />
        <div class="mt-4">
          <div label-for="input-3">
            <p class="inline-block text-l md:text-xl">文章網址</p>
            <input
              placeholder="short URL"
              type="text"
              v-model="shortUrl"
              v-on:keyup.native="updateArticle()"
              class="
                inline-block
                outline-none
                text-l
                md:text-xl
                border-b border-solid
              "
            />
          </div>

          <div>
            <p class="inline-block text-l md:text-xl">簡介 (10 字為限)</p>
            <input
              placeholder="intro"
              type="text"
              v-model="intro"
              v-on:keyup.native="updateArticle()"
              class="
                inline-block
                outline-none
                text-l
                md:text-xl
                border-b border-solid
              "
            />
          </div>
          <span>
            <button
              v-on:click.prevent="submitToReview()"
              v-if="!articlesState.dashboard.edit.isUpdatedError"
              class="
                inline-block
                border border-solid
                text-xl
                md:text-2xl
                p-2
                shadow
              "
            >
              {{ submitToReviewText || "發佈文章" }}
            </button>
          </span>
          <button
            v-on:click.prevent="updateArticle('direct')"
            v-if="!articlesState.dashboard.edit.isUpdatedError"
            class="
              inline-block
              border border-solid
              text-xl
              md:text-2xl
              p-2
              shadow
              float-right
            "
          >
            儲存成草稿
          </button>
          <br />
          <span
            class="
              hover-msg
              z-10
              bg-gray-500
              text-base
              md:text-xl
              text-center text-white
              p-2
              rounded-md
            "
            >點擊之後將會進入我們的文章審查程序。🚀</span
          >
          <h3 class="text-center">
            <p
              theme="danger"
              v-if="articlesState.dashboard.edit.isUpdatedError"
            >
              儲存失敗
            </p>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "articleEditConfig",
  props: ["article"],
  data() {
    return {
      title: this.article.title || "",
      shortUrl: this.article.shortUrl || "",
      coverPhoto: this.article.coverPhoto || "",
      intro: this.article.intro || "",
      selectedTag: this.article.tagId || "",
      tags: [],

      submitToReviewText: "",
    };
  },
  computed: {
    ...mapState({
      articlesState: "articles",
    }),
  },
  methods: {
    randomShortUrl() {
      let str = Math.random().toString(36).replace("0.", "");
      this.shortUrl = str;
    },
    getTags() {
      this.$axios.get("/tags/all").then((i) => {
        let data = i.data.data;
        this.tags = data.map((tag) => {
          return {
            value: tag.tagId,
            text: tag.name,
          };
        });
      });
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
    this.getTags();
  },
  components: {},
};
</script>

<style scoped>
span ~ span.hover-msg {
  visibility: hidden;
}
span:hover ~ span.hover-msg {
  visibility: visible;
}
</style>

