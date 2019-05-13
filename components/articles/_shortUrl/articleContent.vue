<template>
  <div>
    <h2 id="title">
      {{article.title}}
    </h2>
    <hr />
    <div id="article">
      <p v-html="article.content">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleShortUrlArticleContent',
  props: ['article']
}
</script>

<style scoped>
#title {
  font-family: 'Noto Serif TC', serif;
  line-height: 1.3em;
  letter-spacing: 2px;
}
@media only screen and (max-width: 1140px) {
  #title {
    font-size: 1.8em;
    font-weight: bold;
  }
}
#article {
  font-family: 'Noto Serif TC', serif;
  letter-spacing: 2px;
}
</style>
