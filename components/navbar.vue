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
              <d-nav-item v-b-modal.modalAccountForm>成為讀者</d-nav-item>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template slot="button-content">Me </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </d-navbar-nav>
          </d-collapse>
        </div>
      </d-navbar>
    </div>

    <div>
      <b-modal id="modalAccountForm" v-bind:title="accountFormText">
        <signinForm v-if="accountFormType === 'signin'" />
        <registerForm v-if="accountFormType === 'register'" />
      </b-modal>
    </div>

  </div>
</template>

<script>
import signinForm from '@/components/_navbar/signin'
import registerForm from '@/components/_navbar/register'

export default {
  name: 'navbar',
  data () {
    return {
      accountFormType: '',
      showAccountForm: '',
      accountFormText: ''
    }
  },
  methods: {
    init () {
      this.accountFormType = 'register'
      this.showAccountForm = false
      this.accountFormText = '成為讀者'
    },
    changeAccountFormStatus (status) {
      this.showAccountForm = status
    },
    switchAccountForm (type) {
      this.accountFormType = type

      if (this.type === 'signin') {
        this.accountFormText = '登入 TheChanger 改變者'
      }
      if (this.type === 'register') {
        this.accountFormText = '成為讀者'
      }
    }
  },
  mounted () {
    this.init()
  },
  components: {
    signinForm,
    registerForm
  }
}
</script>


<style>
</style>
