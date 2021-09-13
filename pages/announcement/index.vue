<template lang="pug">
  .announcement-wrapper
    h1 公告
    h1 Announcement
    table
      thead
        tr
          td.post-date 日期
          td.post-title 標題
          td.post-group 發布部門
      tbody
        tr(
          v-for="article in articleList.slice((nowPage - 1) * 10, nowPage * 10)"
          :key="article.articleId"
        )
          td.post-date {{parseCreateTime(article.createdAt)}}
          td.post-title {{article.title}}
          td.post-group {{article.organization.name}}

    .page-select-wrapper
      div(
        v-if="lessPageMode"
      )
        .page(
          @click="lastPage()"
        ) &#60;
        .page(
          :class="{ 'page-underline': nowPage == page }"
          v-for="page in pageCount"
          :key="page"
          @click="goToPage(page)"
        ) {{page}}

        .page(
          @click="nextPage()"
        ) &#62;

      div(v-else)
        .page(
          @click="lastPage()"
        ) &#60;
        .page(
          :class="{'page-underline': nowPage == 1}" @click="goToPage(1)"
        ) 1
        
        div.split-page(
          v-if="nowPage-1 > 2"
        ) ...
        .page(
          v-if="nowPage-1 > 1"
          @click="goToPage(nowPage - 1)"
        ) {{nowPage - 1}}
        .page.page-underline(
          v-if="nowPage > 1 && nowPage < pageCount"
          @click="goToPage(nowPage)"
        ) {{nowPage}}
        .page(
          v-if="nowPage + 1 < pageCount"
          @click="goToPage(nowPage + 1)"
        ) {{nowPage + 1}}
        .split-page(
          v-if="nowPage + 2 < pageCount"
        ) ...
        
        .page(
          :class="{'page-underline' : nowPage == pageCount}"
          @click="goToPage(pageCount)"
        ) {{pageCount}}
        .page(
          @click="nextPage()"
        )

</template>

<script>
export default {
  name: 'announcementPage',
  data () {
    return {
      articleList:[],
      nowPage: 1,
      pageCount: 0,
    }
  },
  methods: {
    nextPage(){
      if(this.nowPage < Math.floor((this.articleList.length+9)/10)){
        this.nowPage += 1;
      }
    },
    lastPage(){
      if(this.nowPage > 1){
        this.nowPage -= 1;
      }
    },
    getArticles(){
      this.$axios.get(`/articles/all`, {params:{}})
      .then(i => {
        let articleList = i.data.data;
        this.articleList = articleList;
        this.pageCount = Math.floor((this.articleList.length+9)/10);
      })
    },
    parseCreateTime(time){
      return time.slice(0, 10);
    },
    goToPage(page){
      this.nowPage = page;
    },

  },
  computed:{
    lessPageMode(){
      return this.pageCount <= 5;
    }
  },
  mounted(){
    this.getArticles();
  }
}
</script>
<style scoped>
* {
  font-family: 'Source Han Serif TC';
}
h1 {
  font-family: Source Han Serif TC;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 69px;
  text-align: center;
}
table {
  margin: 0 auto;
}
thead {
  background-color: #023047;
}
thead td{
  font-family: Source Han Serif TC;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  color: #ffffff;
}
tr {
  transition: .3s;
}
tbody td {
  position: static;
  font-family: Source Han Serif TC;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #0A1629;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  border-bottom: 1px solid #000000;
}
tbody tr:hover {
  background-color: rgba(142, 202, 230, .5);
}
td {
  height: 52px;
}
.post-date {
  width: 220px;
}
.post-title {
  width: 730px;
}
.post-group {
  width: 130px;
}
.page-select-wrapper {
  margin: 0 auto;
  text-align: center;
}
.page-select-wrapper .page{
  display: inline-block;
  width: 45px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  font-family: Source Han Serif TC;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #0A1629;
  text-align: center;
  transition: .3s;
}
.page-select-wrapper .split-page{
  display: inline-block;
  width: 45px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  font-family: Source Han Serif TC;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #0A1629;
  text-align: center;
}
.page-underline {
  text-decoration: underline #023047;
}
.page:hover {
  color: #ffffff;
  background-color: #219ebc;
  border-radius: 22.5px;
  border-bottom: none;
}

</style>