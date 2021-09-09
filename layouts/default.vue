<template>
  <div>
    <navbar/>
    <notifications />
    <nuxt/>
    <smnavbar />
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import smnavbar from '@/components/smnavbar'

export default {
  name: 'default',
  components: {
    navbar,
    smnavbar
  }
}
</script>


<style scoped>
</style>
