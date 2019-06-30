<template>
  <div>
    <div>
      <mediumEditor 
        :text='article.rawContent || "" ' 
        :options='options' 
        custom-tag='div' 
        v-on:edit='applyTextEdit'
        v-on:keyup.native='updateArticle'
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleEditEditor',
  props: ['article'],
  data () {
    return {
      rawContent: '',
      content: '',
      wordCount: 0,
      estimatedReadingTime: 0,
      typingTimer: '',

      options: {
        toolbar: {
          buttons: ['underline', 'anchor', 'h3', 'h4', 'h5', 'quote']
        },
        placeholder: {
          text: 'Click to start writing...',
          hideOnClick: true
        }, 
        imageDragging: false
      }
    }
  },
  methods: {
    applyTextEdit (ev) {
      this.$store.commit('articles/setTypingStatus', true)

      let inputContent = ev.event.target.innerHTML
      inputContent = inputContent.replace(/<[^>]*>/g," ")
      inputContent = inputContent.replace(/\s+/g, ' ')
      inputContent = inputContent.trim()

      this.calcWordCount(inputContent.length)

      this.content = inputContent

      if (ev.event.target) {
        this.rawContent = ev.event.target.innerHTML
        this.calcEstimatedReadingTime()
      }

    },
    calcWordCount (length) {
      const wordCount = length || ((this.article.content) ? this.article.content.length : 0)
      this.wordCount = wordCount

      this.$store.dispatch('articles/calcEstimatedReadingTime', wordCount)
    },
    calcEstimatedReadingTime () {
      const wordCount = this.wordCount
      this.$store.dispatch('articles/calcEstimatedReadingTime', wordCount)
    },
    updateArticle () {
      const articleId = this.$route.params.articleId
      const updateArticleData = {
        rawContent: this.rawContent,
        content: this.content,
        articleId
      }
      if (this.typingTimer) {
        clearTimeout(this.typingTimer)
          this.typingTimer = null
      }
      this.typingTimer = setTimeout(() => {
        this.$store.dispatch('articles/updateArticle', updateArticleData)
        this.$store.commit('articles/setTypingStatus', false)
      }, 3000)
    }
  },
  mounted () {
    this.calcWordCount()
    this.calcEstimatedReadingTime()
  }
}
</script>

<style scoped>
.medium-editor-element {
  outline: none;
  font-family: 'Noto Serif TC', serif;
  min-height: 50vh;
}
</style>

