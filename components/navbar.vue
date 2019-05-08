<template>
  <div>
    <div>
      <d-navbar toggleable="lg" type="light" class="shadow-sm">
        <div class="container">
          <d-navbar-brand>TheChanger 改變者</d-navbar-brand>

          <d-navbar-toggle target="nav-collapse"></d-navbar-toggle>

          <d-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <d-navbar-nav class="ml-auto">
              <d-nav-item href="#">成為作者</d-nav-item>
              <d-nav-item v-b-modal.modalAccountForm v-if="!navbarState.accessToken">成為讀者</d-nav-item>
              <b-nav-item-dropdown right v-if="navbarState.accessToken">
                <template slot="button-content">{{ navbarState.user.name.last }} {{ navbarState.user.name.first }}</template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="userSignout">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </d-navbar-nav>
          </d-collapse>
        </div>
      </d-navbar>
    </div>

    <div>
      <b-modal id="modalAccountForm" v-bind:title="navbarState.accountFormText" hide-footer hide-header-close>
        <d-button-group class="btn-group special">
            <d-button
              outline
              v-on:click="switchAccountFormType('register')"
              v-bind:class="{ 'active':  navbarState.accountFormType  === 'register' }"
            >
              成為讀者
            </d-button>
            <d-button 
              outline
              v-on:click="switchAccountFormType('signin')"
              v-bind:class="{ 'active':  navbarState.accountFormType  === 'signin' }"
            >
              登入 TheChanger
            </d-button>
        </d-button-group>

        <p></p>

        <div>
          <signinForm v-if="navbarState.accountFormType === 'signin'" />
          <registerForm v-if="navbarState.accountFormType === 'register'" />
        </div>
      </b-modal>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import signinForm from '@/components/_navbar/signin'
import registerForm from '@/components/_navbar/register'

export default {
  name: 'navbar',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      navbarState: 'navbar'
    }),
    hideAccountFormModal () {
      if (navbarState.accessToken) {
        this.$ref['modalAccountForm'].hide()
      }
    }
  },
  mounted () {
    this.checkLoginStatus()
  },
  methods: {
    switchAccountFormType (type) {
      this.$store.commit('navbar/setAccountFormType', type)
      this.$store.commit('navbar/setAccountFormText', type)
    },
    userSignout () {
      this.$store.dispatch('navbar/userSignout')
    },
    checkLoginStatus () {
      this.$store.dispatch('navbar/checkLoginStatus')
    }
  },
  components: {
    signinForm,
    registerForm
  }
}
</script>


<style>
.btn-group.special {
  display: flex;
}

.special .btn {
  flex: 1
}
</style>
