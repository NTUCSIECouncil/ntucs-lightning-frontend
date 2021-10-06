<template>
  <div>
    <h1 class="text-3xl md:text-5xl font-bold text-primary text-center mt-12">
      發布文章
    </h1>
    <h1
      class="text-3xl md:text-5xl font-bold text-primary text-center mt-4 mb-16"
    >
      Write a Post
    </h1>
    <div class="mt-4 w-4/5 md:w-3/5 mx-auto">
      <div>
        <p class="inline-block text-l md:text-xl font-bold">文章標題</p>
        <div class="border-4 border-solid border-primary rounded-lg">
          <input
            placeholder="Title"
            type="text"
            v-model="title"
            v-on:keyup.native="updateArticle()"
            class="outline-none text-l md:text-xl py-2 w-full"
          />
        </div>
      </div>
      <div class="inline-block w-5/12 mt-6">
        <p class="inline-block text-l md:text-xl font-bold">發布日期</p>
        <div class="border-4 border-solid border-primary rounded-lg">
          <input
            placeholder="date"
            type="text"
            v-on:keyup.native="updateArticle()"
            class="outline-none text-l md:text-xl py-2 w-full"
          />
        </div>
      </div>
      <div class="inline-block w-5/12 float-right mt-6">
        <p class="inline-block text-l md:text-xl font-bold">Tags</p>
        <div class="border-4 border-solid border-primary rounded-lg">
          <input
            placeholder="Title"
            type="text"
            v-model="selectedTag"
            v-on:keyup.native="updateArticle()"
            class="outline-none text-l md:text-xl py-2 w-full"
          >
        </div>
      </div>
      <div class="inline-block w-5/12 mt-6">
        <p class="inline-block text-l md:text-xl font-bold">文章簡介</p>
        <div class="border-4 border-solid border-primary rounded-lg">
          <textarea
            placeholder="Intro"
            type="text"
            v-model="intro"
            v-on:keyup.native="updateArticle()"
            rows="6"
            class="
              outline-none
              text-l
              md:text-xl
              border-b border-solid
              py-2
              w-full
              resize-none
            "
          />
        </div>
      </div>
      <div class="inline-block w-5/12 float-right mt-6">
        <p class="inline-block text-l md:text-xl font-bold">文章縮圖</p>
        <div class="mt-2">
          <label
            class="
              text-white
              rounded-full
              bg-secondary
              font-bold
              text-l
              md:text-xl
              cursor-pointer
              p-2
            "
          >
            <input type="file" class="hidden" />
            選擇檔案
          </label>
        </div>
        <p class="inline-block text-l md:text-xl font-bold mt-6">Short Url</p>
        <div class="border-4 border-solid border-primary rounded-lg">
          <input
            placeholder="Short Url"
            type="text"
            v-model="shortUrl"
            v-on:keyup.native="updateArticle()"
            class="outline-none text-l md:text-xl py-2 w-full"
          />
        </div>
      </div>
      <!--<div class="text-l md:text-xl">
        Tags:
        <p v-for="tag in tags" :key="tag.text" class="inline-block">
          <input type="checkbox" :value="tag.value" @change="updateArticle()" />
          <label>{{ tag.text }}</label>
        </p>
      </div>-->
      <!--<span>
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
            mt-4
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
          mt-4
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
        <p theme="danger" v-if="articlesState.dashboard.edit.isUpdatedError">
          儲存失敗
        </p>
      </h3>-->
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
    /*submitToReview() {
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
    },*/
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

