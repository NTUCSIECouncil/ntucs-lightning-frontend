<template>
  <div>
    <div id="readingInfoWrap">
      {{wordCount}} 字 / {{estimatedReadingTime}} 分鐘閱讀
    </div>
    <p></p>
    <div>
      <mediumEditor :text='content' :options='options' custom-tag='h5' v-on:edit='applyTextEdit' />
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleNewEditor',
  data () {
    return {
      content: '',
      wordCount: 0,
      estimatedReadingTime: 0,

      options: {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h3', 'h4', 'quote']
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
      let inputContent = ev.event.target.innerHTML
      inputContent = inputContent.replace(/<[^>]*>/g," ")
      inputContent = inputContent.replace(/\s+/g, ' ')
      inputContent = inputContent.trim()
      this.wordCount = inputContent.length

      if (ev.event.target) {
        this.content = ev.event.target.innerHTML
        this.calcEstimatedReadingTime()
      }

    },
    calcEstimatedReadingTime () {
      let wordCount = this.wordCount
      let time = wordCount / 200

      if (time < 1) {
        this.estimatedReadingTime = 1
      } else {
        this.estimatedReadingTime = Math.ceil(time)
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.medium-editor-element {
  outline: none;
  font-family: 'Noto Serif TC', serif;
  min-height: 50vh;
}
#readingInfoWrap {
  font-family: 'Noto Serif TC', serif;
  background-color: rgb(240,240,240);
  padding: 15px;
}
</style>

