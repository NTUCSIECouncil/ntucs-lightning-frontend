<template>
  <div>
    <h2 id="title">
      {{article.title}}
    </h2>
    <hr />
    <div id="article">
      <p v-html="article.rawContent">
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
  font-weight: bold;
  line-height: 1.3em;
  letter-spacing: 0.2rem;
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
  min-width: 100%;
}
#article > p {
  font-size: 1.3rem;
  line-height: 1.8em;
  letter-spacing: 2px;
}
#article >>> p > pre {
  background: rgba(0,0,0,.05);
  padding: 1.25rem;
  white-space: pre-wrap;
  font-size: 1rem;
}
</style>

