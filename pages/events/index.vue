<template>
  <div class="event-page">
    <div
      class="w-full bg-primary text-white text-center py-12 text-2xl font-bold"
    >
      <h1>活動</h1>
      <h2>Activities</h2>
    </div>
    <Timeline :events="events" />
  </div>
</template>

<script>
import Timeline from "@/components/events/timeline.vue";

export default {
  name: "eventsPage",
  components: {
    Timeline
  },
  data() {
    return {
      events: [
        {
          date: '2021-09-30T00:00:00.000+0800',
          title: "前瞻營 Foresight Camp",
          description:
            "想學會學校從來不加的必備能力成為不折不扣的炫砲工具人嗎？參加前瞻營就對了，一個週末就讓你成為 MD 之神、Linux 之神、Git 之神，保准你吃飽飽賺滿滿！",
        },{
          date: '2021-03-27T00:00:00.000+0800',
          title: "系卡 Koraoke Contest",
          description:
            "系卡提供系上同學一個發光發熱的舞台，不管試想展現美妙的歌喉還是單純想要享受舞台。不只唱歌，也歡迎各種自編曲目和創意表演，給觀眾們一個驚喜！在活動中也會舉辦抽獎活動，敬請期待",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>