<template>
  <div class="wrapper text-center">
    <div
      class="img-wrapper relative mb-12 overflow-hidden"
      v-for="img in titleImages"
      :key="img.id"
    >
      <img class="w-full" :class="{ 'img-blur': img.blur }" :src="img.src" />
      <div class="title-wrapper" :class="'text-' + img.align">
        <h1 class="text-white">{{ img.zhTitle }}</h1>
        <h1 v-if="img.enTitle != ''" class="text-white">{{ img.enTitle }}</h1>
      </div>
    </div>
    <h1 class="mx-auto md:text-3xl mt-20 tracking-widest text-dark">
      {{ date }}
    </h1>
    <h1 class="mx-auto md:text-3xl mt-12 text-dark">{{ intro }}</h1>
    <button
      class="
        text-white
        mx-auto
        bg-primary
        rounded-lg
        text-xl
        md:text-3xl
        px-3
        py-3
        font-bold
        my-12
      "
    >
      手刀報名
    </button>
    <div class="resources mt-40">
      <h1 class="my-6 text-dark">相關資源</h1>
      <h1 class="my-4 text-dark">Resources</h1>
      <markdown :data="markdown"></markdown>
    </div>
    <div class="bg-primary py-12">
      <h1 class="text-white my-8">活動回顧</h1>
      <h1 class="text-white my-4">Best Memories</h1>
    </div>
    <div class="gap-x-1 py-3" :style="{ columnWidth: 400 + 'px' }">
      <img
        class="mb-2 w-full"
        v-for="image in images"
        :src="image.url"
        :key="image.order"
      />
    </div>
  </div>
</template>

<script>
// import image1 from "./image1.png";
// import image2 from "./image2.png";
// import image3 from "./image3.png";
// import grid1 from "./grid1.png";
// import grid2 from "./grid2.png";
// import grid3 from "./grid3.png";
// import grid4 from "./grid4.png";
// import grid5 from "./grid5.png";
// import grid6 from "./grid6.png";
// import grid7 from "./grid7.png";
import markdown from "./markdown.vue";

export default {
  name: "recapPage",
  components: {
    markdown,
  },
  data() {
    return {
      titleImages: [],
      date: "",
      intro: "",
      markdown: "",
      images: [],
    };
  },
  methods:{
    getEvent(){
      const eventId = this.$route.params.eventId
      this.$axios.get(`/events/id/${eventId}`)
        .then(i => {
          let data = i.data.data
          this.titleImages = [
          {
            order: -1,
            src: data.coverPhoto,
            zhTitle: data.nameZh,
            enTitle: data.nameEn,
            blur: true,
            align: "center",
          }, 
          ...data.promotions.map((e) => (
            {
              order: e.order,
              src: e.url,
              zhTitle: e.feature,
              enTitle: "",
              align: "center",
            }
          ))]
          this.images = data.reviewPhotos
          this.markdown = data.markdown
          this.intro = data.description
          // only show date(year-month-day)
          this.date = data.date.split('T')[0]
      })
    } 
  },
  mounted() {
    this.getEvent()
  }
};
</script>

<style scoped>
* {
  font-family: "Source Han Serif TC" serif;
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
.column.side {
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

.img-blur {
  width: calc(100% + 2rem);
  margin: -1rem;
  @apply max-w-none filter blur;
}
</style>