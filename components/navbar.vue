<template>
  <div>
    <no-ssr>
      <div>
        <d-navbar type="light" class="shadow-sm navbar-expand" fixed="top" id="navbar-ntucs-council">
          <div class="container">
            <d-navbar-brand
              href="/articles/"
            >
              <img
                src="/logoV3.png"
                alt="NTUCS Council Logo"
                width="130px;"
              >
            </d-navbar-brand>

            <d-navbar-nav class="d-none d-sm-block">
              <d-dropdown text="分類" is-nav>
                <d-dropdown-item
                  v-for="tag in tagData" 
                  v-bind:key="tag.tagId"
                  :href="`/articles/?tag=${tag.shortUrl}`"
                >
                  {{tag.name}}
                </d-dropdown-item>
              </d-dropdown>
            </d-navbar-nav>

            <d-navbar-nav class="ml-auto text-nowrap">
              <d-button
                class="d-none d-sm-block"
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
                加入系學會
              </d-nav-item>
              <d-nav-item
                class="d-none d-sm-block"
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
                <b-dropdown-item class="text-center">
                  <d-badge outline theme="primary" v-if="usersState.user.role === 'admin' ">
                    管理員
                  </d-badge>
                  <d-badge outline theme="primary" v-if="usersState.user.role === 'orgAdmin' ">
                    組織管理員
                  </d-badge>
                  <d-badge outline theme="primary" v-if="usersState.user.role === 'orgUser' ">
                    作者
                  </d-badge>
                  <d-badge outline theme="primary" v-if="usersState.user.role === 'user' ">
                    讀者
                  </d-badge>
                </b-dropdown-item>
                <b-dropdown-item
                  v-if="usersState.user.role !== 'user'"
                  v-on:click="addArticle()"
                >
                  擴寫文章
                </b-dropdown-item>
                <b-dropdown-item 
                  v-if="usersState.user.role !== 'user'"
                  href="/dashboard/articles/"
                >
                  我的文章
                </b-dropdown-item>
                <!-- <b-dropdown-item href="/dashboard/settings/">帳號設定</b-dropdown-item> -->
                <b-dropdown-divider />
                <b-dropdown-item v-on:click="userSignout">登出</b-dropdown-item>
              </b-nav-item-dropdown>
            </d-navbar-nav>
          </div>
        </d-navbar>
      </div>
      
      <div>
        <b-modal 
          id="modalAccountForm"
          v-bind:title="navbarState.accountFormText"
          hide-footer 
          v-if="!usersState.isLoggedIn"
        >
          <b-button-group class="btn-group special">
              <d-button
                outline
                v-on:click="switchAccountFormType('register')"
                v-bind:class="{ 'active': navbarState.accountFormType  === 'register' }"
              >
                加入系學會
              </d-button>
              <d-button 
                outline
                v-on:click="switchAccountFormType('signin')"
                v-bind:class="{ 'active': navbarState.accountFormType  === 'signin' }"
              >
                登入資工系學會
              </d-button>
          </b-button-group>

          <p></p>

          <div>
            <signinForm v-if="navbarState.accountFormType === 'signin'" />
            <registerForm v-if="navbarState.accountFormType === 'register'" />
          </div>
        </b-modal>
      </div>
    </no-ssr>
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
      tagData: []
    }
  },
  computed: {
    ...mapState({
      usersState: 'users',
      navbarState: 'navbar'
    })
  },
  mounted () {
    this.getTags()
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
          if (pathArray[1] === 'dashboard') {
            this.$router.push('/')
          }
        })
    },
    addArticle () {
      this.$store.dispatch('articles/newArticle')
        .then(response => {
          const data = response.data.data
          this.$router.push(`/dashboard/articles/edit/${data.articleId}`)
        })
    },
    getTags () {
      this.$axios.get(`/tags/all`).then(response => {
        const tagData = response.data.data
        this.tagData = tagData
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
#navbar-ntucs-council {
  background: #fff;
  padding: .5rem 1rem;
}

.btn-group.special {
  display: flex;
}

.special .btn {
  flex: 1
}
.navbar-nav .dropdown-menu {
  position: absolute !important;
}
.modal-backdrop {
  opacity: .12 !important;
}
</style>
