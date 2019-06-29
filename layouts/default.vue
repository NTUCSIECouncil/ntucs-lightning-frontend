<template>
  <div>
    <navbar />
    <notifications />
    <nuxt />
    <smNavbar class="smNavbar" />
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
  @media only screen and (min-width: 576px) {
    .smNavbar {
      display: none;
    }
  }
</style>
