<template>
  <div>
    <no-ssr>
      <b-container>
        <b-row>
          <b-col lg="9">
            <articleNewEditor />
          </b-col>
          <b-col lg="3">
            <articleNewConfig />
          </b-col>
        </b-row>
      </b-container>
    </no-ssr>
  </div>
</template>

<script>
import articleNewEditor from '@/components/dashboard/articles/new/articleNewEditor'
import articleNewConfig from '@/components/dashboard/articles/new/articleNewConfig'

export default {
  middleware: [
    'authRequired',
    'authRequiredRoleOrgUser'
  ],
  name: 'dashboardArticleNewPage',
  data () {
    return {
      
    }
  },
  methods: {
  },
  mounted () {
    
  },
  components: {
    articleNewEditor,
    articleNewConfig
  }
}
</script>

<style scoped>
</style>

