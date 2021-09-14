<template>
  <div class="announcement-wrapper">
    <h1 class="text-3xl md:text-5xl leading-10 font-bold text-center">公告</h1>
    <h1 class="text-3xl md:text-5xl leading-loose font-bold text-center">
      Announcement
    </h1>
    <table class="m-12 container mx-auto">
      <thead>
        <tr>
          <td class="w-1/6 whitespace-nowrap table-text text-white">日期</td>
          <td class="w-2/3 whitespace-normal table-text text-white">標題</td>
          <td class="w-1/6 whitespace-nowrap table-text text-white">
            發布部門
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover:bg-light hover:bg-opacity-50 cursor-pointer"
          v-for="article in articleList.slice((nowPage - 1) * 10, nowPage * 10)"
          :key="article.articleId"
          @click.prevent="showArticle(article)"
        >
          <td class="w-1/6 whitespace-nowrap table-text">
            {{ parseCreateTime(article.createdAt) }}
          </td>
          <td
            class="
              w-2/3
              whitespace-normal
              table-text
              overflow-ellipsis overflow-hidden
              max-w-0
            "
          >
            {{ article.title }}
          </td>
          <td class="w-1/6 whitespace-nowrap table-text">
            {{ article.organization.name }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center my-0 mx-auto">
      <div v-if="lessPageMode">
        <div class="page cursor-pointer" @click="lastPage()">&#60;</div>
        <div
          class="page cursor-pointer"
          :class="{ 'page-underline': nowPage === page }"
          v-for="page in pageCount"
          :key="page"
          @click="goToPage(page)"
        >
          {{ page }}
        </div>
        <div class="page cursor-pointer" @click="nextPage()">&#62;</div>
      </div>

      <div v-else>
        <div class="page cursor-pointer" @click="lastPage()">&#60;</div>
        <div
          class="page cursor-pointer"
          :class="{ 'page-underline': nowPage === 1 }"
          @click="goToPage(1)"
        >
          1
        </div>

        <div class="split-page" v-if="nowPage - 1 > 2">...</div>

        <div
          class="page cursor-pointer"
          v-if="nowPage - 1 > 1"
          @click="goToPage(nowPage - 1)"
        >
          {{ nowPage - 1 }}
        </div>
        <div
          class="page page-underline"
          v-if="nowPage > 1 && nowPage < pageCount"
          @click="goToPage(nowPage)"
        >
          {{ nowPage }}
        </div>
        <div
          class="page cursor-pointer"
          v-if="nowPage + 1 < pageCount"
          @click="goToPage(nowPage + 1)"
        >
          {{ nowPage + 1 }}
        </div>
        <div class="split-page text-xl" v-if="nowPage + 2 < pageCount">...</div>

        <div
          class="page cursor-pointer"
          :class="{ 'page-underline': nowPage === pageCount }"
          @click="goToPage(pageCount)"
        >
          {{ pageCount }}
        </div>
        <div class="page cursor-pointer" @click="nextPage()">&#62;</div>
      </div>
    </div>
    <div
      class="pop-wrapper top-0 left-0 w-full h-full"
      v-if="articleOpen"
      @click.self="articleOpen = false"
    >
      <div
        class="
          pop-card
          container
          top-1/2
          left-1/2
          overflow-auto overflow-y-scroll
          pb-6
        "
      >
        <h1
          class="
            text-2xl
            md:text-3xl
            leading-6
            font-bold
            text-center
            break-words
            my-6
          "
        >
          {{ readingArticle ? readingArticle.title : "" }}
        </h1>
        <article class="text-base text-black break-words pop-content">
          {{ readingArticle ? readingArticle.intro : "" }}
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "announcementPage",
  data() {
    return {
      articleList: [],
      nowPage: 1,
      pageCount: 0,
      articleOpen: false,
      readingArticle: undefined,
    };
  },
  methods: {
    nextPage() {
      if (this.nowPage < Math.floor((this.articleList.length + 9) / 10)) {
        this.nowPage += 1;
      }
    },
    lastPage() {
      if (this.nowPage > 1) {
        this.nowPage -= 1;
      }
    },
    getArticles() {
      this.$axios.get(`/articles/all`, { params: {} }).then((i) => {
        let articleList = i.data.data;
        this.articleList = articleList;
        this.pageCount = Math.floor((this.articleList.length + 9) / 10);
      });
    },
    parseCreateTime(time) {
      return time.slice(0, 10);
    },
    goToPage(page) {
      this.nowPage = page;
    },
    showArticle(article) {
      this.readingArticle = article;
      this.articleOpen = true;
    },
  },
  computed: {
    lessPageMode() {
      return this.pageCount <= 5;
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
<style scoped>
* {
  font-family: "Source Han Serif TC";
}
thead {
  @apply bg-primary;
}
tbody td {
  @apply text-primary border-b border-solid border-black;
}
.table-text {
  @apply font-bold leading-4 h-12 px-2.5  text-base md:text-xl my-0 mx-3;
}
tr {
  @apply duration-300;
}
.page {
  @apply w-12 h-12 p-1 duration-300 inline-block font-bold text-center text-primary leading-10 text-xl md:text-2xl rounded-full hover:text-white hover:bg-light hover:bg-opacity-100;
}
.split-page {
  @apply w-12 h-12 p-1 inline-block font-bold text-center leading-10 text-primary text-xl md:text-2xl rounded-full;
}

.page-underline {
  @apply underline;
}
.pop-wrapper {
  @apply absolute z-10 bg-gray-300 bg-opacity-25 backdrop-filter backdrop-blur-md;
}
.pop-card {
  @apply absolute bg-white z-20 transform -translate-x-1/2 -translate-y-1/2 shadow-xl pt-2 md:pt-8 px-4 md:px-24 pb-6 md:pb-12;
  max-height: 70%;
  animation: popup 0.5s;
}

.pop-card * {
  animation: popup-inward 0.5s;
}
.pop-card::-webkit-scrollbar {
  @apply w-0.5 bg-gray-50;
}
.pop-card::-webkit-scrollbar-thumb {
  @apply rounded-sm bg-primary;
}
@keyframes popup {
  from {
    transform: scale(0) translateX(0) translateY(0);
  }
  to {
    transform: scale(1) translateX(-50%) translateY(-50%);
  }
}
@keyframes popup-inward {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>