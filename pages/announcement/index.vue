<template>
  <div class="announcement-wrapper">
    <h1>公告</h1>
    <h1>Announcement</h1>
    <table>
      <thead>
        <tr>
          <td class="post-date">日期</td>
          <td class="post-title">標題</td>
          <td class="post-group">發布部門</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articleList.slice((nowPage-1)*10,nowPage*10)" :key="article.articleId">
          <td class="post-date">{{parseCreateTime(article.createdAt)}}</td>
          <td class="post-title">{{article.title}}</td>
          <td class="post-group">{{article.organization.name}}</td>
        </tr>
      </tbody>
    </table>
    <div class="page-select-wrapper">
      <div v-if="lessPageMode">
        <div class="page" @click="lastPage()">&#60;</div>
        <div class="page" :class="{'page-underline':nowPage==page}" 
                  v-for="page in pageCount" :key="page" @click="goToPage(page)" >
          {{page}}
        </div>
        <div class="page" @click="nextPage()">&#62;</div>
      </div>

      <div v-else>
        <div class="page" @click="lastPage()">&#60;</div>
        <div class="page" :class="{'page-underline':nowPage==1}" @click="goToPage(1)" >1</div>
        
        <div class='split-page' v-if="nowPage-1 > 2">...</div>

        <div class="page" v-if="nowPage-1 > 1" @click="goToPage(nowPage-1)">{{nowPage-1}}</div>
        <div class="page page-underline" v-if="nowPage > 1 && nowPage < pageCount" @click="goToPage(nowPage)">{{nowPage}}</div>
        <div class="page" v-if="nowPage+1 < pageCount" @click="goToPage(nowPage+1)">{{nowPage+1}}</div>
        <div class='split-page' v-if="nowPage+2 < pageCount">...</div>
        
        <div class="page" :class="{'page-underline':nowPage==pageCount}" @click="goToPage(pageCount)">{{pageCount}}</div>
        <div class="page" @click="nextPage()">&#62;</div>
      </div>
    </div>
   </div>
</template>

<script>
export default {
  name: 'announcementPage',
  data() {
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