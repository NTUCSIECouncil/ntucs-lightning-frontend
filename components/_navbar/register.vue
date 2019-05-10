<template>
  <div>
    <b-form @submit.prevent="userRegister">
      <b-form-group label="姓">
        <b-form-input
          required
          placeholder="Lase Name"
          type="name"
          v-model="userRegisterForm.name.last"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="名">
        <b-form-input
          required
          placeholder="First Name"
          type="name"
          v-model="userRegisterForm.name.first"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="暱稱">
        <b-form-input
          required
          placeholder="Preferred Name"
          type="name"
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
      this.$store.commit('users/setAccountFormType', 'signin')
      this.$store.commit('users/setAccountFormText', 'signin')
    },
    userRegister () {
      this.$store.dispatch('users/userRegister', this.userRegisterForm)
    }
  }
}
</script>

