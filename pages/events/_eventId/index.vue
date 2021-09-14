<template>
    <div class="wrapper text-center">
        <div class="img-wrapper relative my-12" 
                v-for="img in titleImages" :key="img.id">
            <img class="w-full" :src='img.src'>
            <div class="title-wrapper" :class="'text-'+img.align">
                <h1 class="text-white">{{img.zhTitle}}</h1>
                <h1 v-if="img.enTitle!=''" class="text-white">{{img.enTitle}}</h1>
            </div>
        </div>
        <h1 class="mx-auto md:text-4xl mt-20 tracking-widest text-dark">{{date}}</h1>
        <h1 class="mx-auto md:text-4xl mt-12 text-dark">{{intro}}</h1>
        <button class="text-white mx-auto bg-primary rounded-lg text-xl md:text-4xl px-3 py-3 font-bold my-12">手刀報名</button>
        <div class="resources mt-40">
            <h1 class="my-6 text-dark">相關資源</h1>
            <h1 class="my-4 text-dark">Resources</h1>
            <markdown :data="markdown"></markdown>
        </div>
        <div class="bg-primary py-12">
            <h1 class="text-white my-8">活動回顧</h1>
            <h1 class="text-white my-4">Best Memories</h1>
        </div>
        <div class="flex flex-wrap py-0 px-1 mt-20 mx-1">
            <div class="column side">
                <img :src='images[0].src'>
                <img :src='images[1].src'>
            </div>
            <div class="column">
                <img :src='images[2].src'>
                <img :src='images[3].src'>
                <img :src='images[4].src'>
            </div>
            <div class="column side">
                <img :src='images[5].src'>
                <img :src='images[6].src'>
            </div>
        </div>
    </div>
</template>

<script>
import image1 from './image1.png'
import image2 from './image2.png'
import image3 from './image3.png'
import grid1 from './grid1.png'
import grid2 from './grid2.png'
import grid3 from './grid3.png'
import grid4 from './grid4.png'
import grid5 from './grid5.png'
import grid6 from './grid6.png'
import grid7 from './grid7.png'
import markdown from './markdown.vue'

export default {
    name:'recapPage',
    components:{
        markdown
    },
    data(){
        return{
            titleImages:[
                {id:1,src:image1, zhTitle:'系卡', enTitle:'CSIE Karaoke', align:'center'},
                {id:2,src:image2, zhTitle:'展現你歌喉的最佳機會', enTitle:'', align:'left'},
                {id:3,src:image3, zhTitle:'眾星絕倫、精采絕倫', enTitle:'', align:'right'},
            ],
            date:'2020-09-30',
            intro:'精彩表演，隆重展開',
            markdown:`# Header \n It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)`+'\n'+'```pythons = "Python"'+'\n'+'print s```',
            images:[
                {id:1,src:grid1},
                {id:2,src:grid2},
                {id:3,src:grid3},
                {id:4,src:grid4},
                {id:5,src:grid5},
                {id:6,src:grid6},
                {id:7,src:grid7},
            ]
        }
    }
}
</script>

<style scoped>

* {
  font-family: 'Source Han Serif TC' serif;
}
.title-wrapper {
  @apply absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-full;
}
h1 {  
  @apply text-xl md:text-5xl px-3 font-bold;
}
.text-dark {
  color: #0a1629;
}
.card {
  @apply shadow-md border border-solid border-primary;
}
.column {
  @apply flex-auto px-1;
  max-width: 40%; 
}
.column.side{
  max-width: 30%;
}

.column img {
  @apply mt-2 align-middle w-full;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    max-width: 50%;
  }
  .column.side {
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    max-width: 100%;
  }
  .column.side {
    max-width: 100%;
  }
}
</style>