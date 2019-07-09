<template>
  <div>
    <navbar />
    <notifications />
    <nuxt />
    <smNavbar />
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import smNavbar from '@/components/smNavbar'

export default {
  name: 'default',
  components: {
    navbar,
    smNavbar
  }
}
</script>


<style scoped>
</style>
