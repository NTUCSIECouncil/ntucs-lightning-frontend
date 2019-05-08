<template>
  <div>
    <b-form @submit="userRegister">
      <b-form-group label="姓">
        <b-form-input
          required
          placeholder="Lase Name"
          type="lastname"
          v-model="userRegisterForm.name.last"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="名">
        <b-form-input
          required
          placeholder="First Name"
          type="firstname"
          v-model="userRegisterForm.name.first"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="暱稱">
        <b-form-input
          required
          placeholder="Preferred Name"
          type="nickname"
          v-model="userRegisterForm.name.preferred"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="電子郵件">
        <b-form-input
          required
          placeholder="Email"
          type="email"
          v-model="userRegisterForm.email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="密碼">
        <b-form-input
          required
          placeholder="Password"
          type="password"
          v-model="userRegisterForm.password"
        ></b-form-input>
      </b-form-group>

      <p></p>
      <d-button block-level theme="primary" type="submit">
        註冊
      </d-button>
  
    </b-form>
    <br />
    <div class="alreadyMember text-center" v-on:click="alreadyMember()">
      已經有 TheChanger 帳號？按此登入。
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbarRegister',
  data () {
    return {
      userRegisterForm: {
        name: {
          last: '',
          first: '',
          preferred: ''
        },
        email: '',
        password: ''
      }
    }
  },
  methods: {
    alreadyMember () {
      this.$store.commit('navbar/setAccountFormType', 'signin')
      this.$store.commit('navbar/setAccountFormText', 'signin')
    },
    userRegister () {
      this.$store.dispatch('navbar/userRegister', this.userRegisterForm)
    }
  }
}
</script>

