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
      events: [],
    };
  },
  methods:{
    getEvents(){
      this.$axios.get('/events')
        .then(i => {
          let data = i.data.data
          this.events = data
      })
    }
  },
  mounted(){
    this.getEvents()
  }
};
</script>

<style scoped>
</style>