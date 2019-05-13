<template>
  <div>
    <d-card id="articleNewConfigWrap">
      <d-card-body>
        <h4>文章設定</h4>
        <hr />
        <b-form @submit.prevent="">
          <b-form-group label="標題 (15 字為限)" label-for="input-2">
            <b-input
              required
              type="text"
            ></b-input>
          </b-form-group>

          <b-form-group label="文章網址" label-for="input-3">
            <b-input
              required
              type="text"
            ></b-input>
          </b-form-group>

          <b-form-group label="分類" label-for="input-4">
            <b-input
              required
              type="text"
            ></b-input>
          </b-form-group>

          <p></p>
          <d-button block-level theme="primary" type="submit">
            發佈文章
          </d-button>


        </b-form>
      </d-card-body>
    </d-card>
  </div>
</template>

<script>

export default {
  name: 'articleNewConfig',
  data () {
    return {
      content: '',
      editorOption: {}
    }
  },
  methods: {
  
  },
  mounted () {
    
  },
  components: {
  }
}
</script>

<style scoped>
#articleNewConfigWrap {
}
</style>

