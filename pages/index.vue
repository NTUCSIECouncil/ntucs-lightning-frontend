<template>
  <section class="container">
  </section>
</template>

<script>

export default {
  name: 'index',
  methods: {
    redirectToArticlePage () {
      this.$router.push('/articles')
    }
  },
  created () {
    this.redirectToArticlePage()
  },
  components: {
  }
}
</script>

<style>
</style>
