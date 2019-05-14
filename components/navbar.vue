<template>
  <div>
    <div>
      <d-navbar toggleable="lg" type="light" class="shadow-sm" fixed="top" id="navbar-thechanger">
        <div class="container">
          <d-navbar-brand
            href="/articles/"
          >
            <img
              src="/theChangerLogov2.png"
              alt="TheChanger Logo"
              width="130px;"
            >
          </d-navbar-brand>

          <d-collapse id="avoidWarn" is-nav>
            <d-navbar-nav>
            </d-navbar-nav>
            <d-navbar-nav class="ml-auto">
              <d-button
                outline
                squared
                v-if="!usersState.isLoggedIn"
              >
                成為作者
              </d-button>
              <d-nav-item
                v-b-modal.modalAccountForm
                v-if="!usersState.isLoggedIn"
              >
                成為讀者
              </d-nav-item>
              <d-button
                outline
                squared
                v-if="usersState.isLoggedIn && usersState.user.role === 'admin'"
              >
                發表文章
              </d-button>
              <d-nav-item
                v-if="usersState.isLoggedIn && usersState.user.role === 'admin'"
              >
                管理介面
              </d-nav-item>
              <b-nav-item-dropdown
                right
                v-if="usersState.isLoggedIn"
              >
                <template slot="button-content">
                  {{ usersState.user.name.last }} {{ usersState.user.name.first }}
                </template>
                <b-dropdown-item
                  v-if="!usersState.user.isVerified"
                >
                  <i class="fas fa-exclamation-triangle"></i> 
                  驗證我的帳號
                </b-dropdown-item>
                <b-dropdown-divider v-if="!usersState.user.isVerified" />
                <b-dropdown-item href="/dashboard/articles/new">擴寫文章</b-dropdown-item>
                <b-dropdown-item href="/dashboard/articles/">我的文章</b-dropdown-item>
                <b-dropdown-item href="/dashboard/settings/">帳號設定</b-dropdown-item>
                <b-dropdown-divider />
                <b-dropdown-item v-on:click="userSignout">登出</b-dropdown-item>
              </b-nav-item-dropdown>
            </d-navbar-nav>
          </d-collapse>
        </div>
      </d-navbar>
    </div>

    <div>
      <b-modal 
        id="modalAccountForm"
        v-bind:title="navbarState.accountFormText"
        hide-footer 
        hide-header-close
        v-if="!usersState.isLoggedIn"
      >
        <b-button-group class="btn-group special">
            <d-button
              outline
              v-on:click="switchAccountFormType('register')"
              v-bind:class="{ 'active': navbarState.accountFormType  === 'register' }"
            >
              成為讀者
            </d-button>
            <d-button 
              outline
              v-on:click="switchAccountFormType('signin')"
              v-bind:class="{ 'active': navbarState.accountFormType  === 'signin' }"
            >
              登入 TheChanger
            </d-button>
        </b-button-group>

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
      usersState: 'users',
      navbarState: 'navbar'
    })
  },
  mounted () {
  },
  methods: {
    switchAccountFormType (type) {
      this.$store.commit('navbar/setAccountFormType', type)
      this.$store.commit('navbar/setAccountFormText', type)
    },
    userSignout () {
      this.$store.dispatch('users/userSignout')
        .then(i => {
          const pathArray = this.$route.path.split('/')
          if (pathArray[1] === 'settings') {
            this.$router.push('/')
          }
        })
    }
  },
  components: {
    signinForm,
    registerForm
  }
}
</script>


<style>
#navbar-thechanger {
  background: #fff;
}
.btn-group.special {
  display: flex;
}

.special .btn {
  flex: 1
}
</style>
