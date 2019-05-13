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
  min-height: 40vh;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
