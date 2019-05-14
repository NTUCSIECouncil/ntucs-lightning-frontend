<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="3">
          <settingsInfoColumn
            v-bind:userData="userData"
          />
        </b-col>
        <b-col md="4" offset-md="1">
          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import settingsInfoColumn from "@/components/dashboard/settings/infoColumn"

export default {
  middleware: 'authRequired',
  name: 'dashboardSettings',
  data () {
    return {
      userData: {}
    }
  },
  methods: {
    getUserData () {
      this.$axios.get('/users/me', {
        headers: {
          authorization: this.$storage.getLocalStorage('accessToken')
        }
      }).then(i => {
        let userData = i.data.data
        this.userData = userData
      })
    }
  },
  mounted() {
    this.getUserData()
  },
  components: {
    settingsInfoColumn
  }
}
</script>

