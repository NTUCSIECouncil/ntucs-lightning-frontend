<template>
  <div class="announcement-wrapper">
    <h1 class="leading-10">公告</h1>
    <h1 class="leading-loose">Announcement</h1>
    <table class="m-12">
      <thead>
        <tr>
          <td class="post-date table-text text-white">日期</td>
          <td class="post-title table-text text-white">標題</td>
          <td class="post-group table-text text-white">發布部門</td>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-light hover:bg-opacity-50" v-for="article in articleList.slice((nowPage-1)*10,nowPage*10)" 
              :key="article.articleId" @click.prevent="showArticle(article)">
          <td class="post-date table-text">{{parseCreateTime(article.createdAt)}}</td>
          <td class="post-title table-text">{{article.title}}</td>
          <td class="post-group table-text">{{article.organization.name}}</td>
        </tr>
      </tbody>
    </table>
    <div class="page-select-wrapper text-center">
      <div v-if="lessPageMode">
        <div class="page page-choose" @click="lastPage()">&#60;</div>
        <div class="page page-choose" :class="{'page-underline':nowPage==page}" 
                  v-for="page in pageCount" :key="page" @click="goToPage(page)" >
          {{page}}
        </div>
        <div class="page page-choose" @click="nextPage()">&#62;</div>
      </div>

      <div v-else>
        <div class="page page-choose" @click="lastPage()">&#60;</div>
        <div class="page page-choose" :class="{'page-underline':nowPage==1}" @click="goToPage(1)" >1</div>
        
        <div class='split-page page-choose' v-if="nowPage-1 > 2">...</div>

        <div class="page page-choose" v-if="nowPage-1 > 1" @click="goToPage(nowPage-1)">{{nowPage-1}}</div>
        <div class="page page-underline page-choose" v-if="nowPage > 1 && nowPage < pageCount" @click="goToPage(nowPage)">{{nowPage}}</div>
        <div class="page page-choose" v-if="nowPage+1 < pageCount" @click="goToPage(nowPage+1)">{{nowPage+1}}</div>
        <div class='split-page page-choose' v-if="nowPage+2 < pageCount">...</div>
        
        <div class="page page-choose" :class="{'page-underline':nowPage==pageCount}" @click="goToPage(pageCount)">{{pageCount}}</div>
        <div class="page page-choose" @click="nextPage()">&#62;</div>
      </div>
    </div>
    <div class="pop-wrapper top-0 left-0 w-full h-full" v-if="articleOpen" @click.prevent="articleOpen=false">
      <div class="pop-card">
        <h1 class="leading-loose">{{readingArticle?readingArticle.title:''}}</h1>
        <article class="pop-content text-black font-medium">
          {{readingArticle?readingArticle.intro:''}}
        </article>
      </div>
    </div>
   </div>
</template>

<script>
export default {
  name: 'announcementPage',
  data() {
    return {
      articleList:[
        {articleId:'1', createdAt:'2021-02-12', title:'title', organization:{name:'學術部'}, intro:'hihihihihihihi'},
        {articleId:'1', createdAt:'2021-02-12', title:'title', organization:{name:'學術部'}},
        {articleId:'1', createdAt:'2021-02-12', title:'title', organization:{name:'學術部'}},
      ],
      nowPage: 1,
      pageCount: 10,
      articleOpen: false,
      readingArticle: undefined
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
    showArticle(article){
      this.readingArticle = article;
      this.articleOpen = true;
    }
  },
  computed:{
    lessPageMode(){
      return this.pageCount <= 5;
    }
  },
  /*mounted(){
    this.getArticles();
  }*/
}
</script>
<style scoped>
* {
  font-family: 'Source Han Serif TC';
}
h1{
  @apply text-5xl font-bold text-center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
thead {
  background-color: #023047;
}
tbody td {
  color: #0A1629;
  border-bottom: 1px solid #000000;
}
.table-text {
  @apply text-xl font-bold leading-4 h-12;
  margin: 0px 10px;
}
tr {
  transition: .3s;
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
}
.page-select-wrapper .page{
  width: 45px;
  height: 45px;
  padding: 4px;
  color: #0A1629;
  transition: .3s;
}
.page-select-wrapper .split-page{
  width: 45px;
  height: 45px;
  padding: 4px;
  color: #0A1629;
}
.page-choose {
  @apply inline-block font-bold text-center text-xl items-center justify-center;
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
.pop-wrapper {
  position: absolute;
  z-index: 2;
  background: rgba(196, 196, 196, .28);
  backdrop-filter: blur(10px);
}
.pop-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1080px;
  height: 360px;
  transform: translateX(-50%) translateY(-50%);
  background: #ffffff;
  z-index: 3;
  padding: 52px 110px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  animation: popup .5s;
}
.pop-card *{
  animation: popup-inward .5s;
}
@keyframes popup{
  from {
    width: 0px;
    height: 0px;
  }
  to{
    width: 1080px;
    height: 360px;
  }
}
@keyframes popup-inward {
  from {
    transform: scale(0);
  }
  to{
    transform: scale(1);
  }
}
.pop-content{
  width: 860px;
  height: 88px;
  font-size: 16px;
  line-height: 23px;
}
</style>