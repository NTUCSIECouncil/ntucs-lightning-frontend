<template>
  <div>
    <navbar />
    <notifications />
    <nuxt />
  </div>
</template>

<script>
import navbar from '@/components/navbar'

export default {
  name: 'default',
  components: {
    navbar
  }
}
</script>


<style scoped>
</style>
