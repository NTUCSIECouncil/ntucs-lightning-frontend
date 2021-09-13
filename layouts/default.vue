<template>
  <div>
    <div :style="mainStyle">
      <topnavbar />
      <secondnavbar />
      <notifications />
      <nuxt class="container mx-auto" />
    </div>
    <smnavbar />
  </div>
</template>

<script>
import topnavbar from '@/components/topnavbar'
import secondnavbar from '@/components/secondnavbar'
import smnavbar from '@/components/smnavbar'

export default {
  name: 'default',
  components: {
    secondnavbar,
    smnavbar,
    topnavbar
  },
  data() {
    return{
      windowHeight: 0
    };
  },
  computed:{
    mainStyle: function() {
      // window height - height of smnavbar will be the min height of the smnavbar
      if(this.windowHeight >= 236){
        return {
          'min-height': (this.windowHeight - 236)+'px'
        }
      }
      return {
        'min-height': '0px'
      }
    }
  },
  created() {
    if (typeof window !== 'undefined'){
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  },
  destroyed() {
    if (typeof window !== 'undefined'){
      window.removeEventListener('resize', this.handleResize);
    }
  },
  methods: {
    handleResize() {
      this.windowHeight = window.innerHeight;
    }
  }
}
</script>


<style scoped>
</style>
