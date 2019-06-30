<template>
  <div>
    <div
      id="articleCoverPhoto"
      v-bind:style="{ 'background-image': `url(${article.coverPhoto})` }"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleShortUrlArticleCoverPhoto',
  props: ['article']
}
</script>

<style scoped>
#articleCoverPhoto {
  max-height: 20rem;
  min-height: 20rem;
  
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
