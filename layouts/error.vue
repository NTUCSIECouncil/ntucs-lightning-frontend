<template>
  <div class="container">
    <div class="errorWrap d-block mx-auto">
      <h1 v-if="error.statusCode === 404">
        Page Not Found.
      </h1>
      <h1 v-if="error.statusCode === 403">
        Restricted Area.
      </h1>
      <h1 v-else>
        Something went wrong.
      </h1>
      <p></p>
      <nuxt-link to="/">Back to Main Page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
<style scoped>
.errorWrap {
  margin-top: 1rem;
  background-color: rgba(240,240,240);
  padding: 1.5rem;
  text-align: center;
}
</style>
