<template>
  <div>
    <b-form @submit.prevent="userSignin">
      <b-form-group label="電子郵件" label-for="input-2">
        <b-input
          required
          placeholder="Email"
          type="email"
          v-model="userSigninForm.email"
        ></b-input>
      </b-form-group>

      <b-form-group label="密碼" label-for="input-3">
        <b-input
          required
          placeholder="Password"
          type="password"
          v-model="userSigninForm.password"
        ></b-input>
      </b-form-group>
      <d-button block-level theme="primary" type="submit">
        登入
      </d-button>

    </b-form>

    <br />
    <div class="notMember text-center" v-on:click="notMember()">
      還沒有 TheChanger 帳號？按此註冊。
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbarSignin',
  data () {
    return {
      userSigninForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    notMember () {
      this.$store.commit('users/setAccountFormType', 'register')
      this.$store.commit('users/setAccountFormText', 'register')
    },
    userSignin () {
      this.$store.dispatch('users/userSignin', this.userSigninForm)
    }
  }
}
</script>

