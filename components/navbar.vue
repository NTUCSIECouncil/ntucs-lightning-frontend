<template>
  <div>
    <no-ssr>
      <div>
        <d-navbar
          type="light"
          class="shadow-sm navbar-expand"
          fixed="top"
          id="navbar-ntucs-council"
        >
          <div class="container">
            <input type="button" @click="$router.push('/')" value="首頁" />
            <input
              type="button"
              @click="$router.push('/announcement')"
              value="公告"
            />
            <input
              type="button"
              @click="$router.push('/events')"
              value="活動"
            />
            <input
              type="button"
              @click="$router.push('/articles')"
              value="文章"
            />
            <span style="flex: 1; text-align: center"
              >台灣大學資訊工程系系學會</span
            >

            <d-navbar-nav class="ml-auto text-nowrap">
              <select name="" id="">
                <option>各部會</option>
              </select>
              <select name="" id="">
                <option>服務</option>
              </select>
              <button
                v-if="!usersState.isLoggedIn"
                @click="handleClickSignIn"
              >
                <i class="fas fa-fingerprint"></i>
                臺大資工系帳號登入
              </button>


              <b-nav-item-dropdown right v-if="usersState.isLoggedIn">
                <span>{{ usersState.user.lastName }}{{ usersState.user.firstName }}</span>
                <b-dropdown-item class="text-center">
                  <d-badge
                    outline
                    theme="primary"
                    v-if="usersState.user.role === 'admin'"
                  >
                    管理員
                  </d-badge>
                  <d-badge
                    outline
                    theme="primary"
                    v-if="usersState.user.role === 'orgAdmin'"
                  >
                    組織管理員
                  </d-badge>
                  <d-badge
                    outline
                    theme="primary"
                    v-if="usersState.user.role === 'orgUser'"
                  >
                    作者
                  </d-badge>
                  <d-badge
                    outline
                    theme="primary"
                    v-if="usersState.user.role === 'user'"
                  >
                    讀者
                  </d-badge>
                </b-dropdown-item>
                <d-dropdown-item
                  class="d-none d-sm-block"
                  v-if="usersState.user.role === 'admin'"
                >
                  管理介面
                </d-dropdown-item>
                <a
                  v-if="usersState.user.role !== 'user'"
                  @click="addArticle()"
                  href="#"
                >
                  擴寫文章
                </a>
                <a
                  v-if="usersState.user.role !== 'user'"
                  href="/dashboard/articles/"
                >
                  我的文章
                </a>
                <a href="/dashboard/settings/"
                  >帳號設定</a>
                <b-dropdown-divider />
                <a href="#" @click="userSignout">登出</a>
              </b-nav-item-dropdown>
            </d-navbar-nav>
          </div>
        </d-navbar>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      tagData: [],
    };
  },
  computed: {
    ...mapState({
      usersState: "users",
      navbarState: "navbar",
    }),
  },
  mounted() {
    this.getTags();
  },
  methods: {
    async handleClickSignIn() {
      let googleOauth = this.$gAuth
      if (googleOauth.isInit) {
        let loginUser
        try {
          loginUser = await googleOauth.signIn()
        } catch (error) {
          if (error.error === 'popup_closed_by_user') {
            alert('請不要關閉視窗。')
            return
          }
          alert('驗證失敗')
          return
        }
        if(!googleOauth.isAuthorized) {
          alert('驗證失敗')
          return
        }
        const idToken = loginUser.getAuthResponse().id_token
        if(!loginUser.getBasicProfile().getEmail().endsWith('csie.ntu.edu.tw')) {
          alert('本平台僅限「國立臺灣大學資訊工程學系」帳號登入。\n無 CSIE Mail/雙主修/輔系同學，請洽 217。')
          return
        }
        try {
          this.$store.dispatch("users/userSignin", idToken)
        } catch (error) {
          alert('驗證失敗')
          return
        }
      }
    },
    switchAccountFormType(type) {
      this.$store.commit("navbar/setAccountFormType", type);
      this.$store.commit("navbar/setAccountFormText", type);
    },
    userSignout() {
      this.$store.dispatch("users/userSignout").then((i) => {
        const pathArray = this.$route.path.split("/");
        if (pathArray[1] === "dashboard") {
          this.$router.push("/");
        }
      });
    },
    addArticle() {
      this.$store.dispatch("articles/newArticle").then((response) => {
        const data = response.data.data;
        this.$router.push(`/dashboard/articles/edit/${data.articleId}`);
      });
    },
    getTags() {
      this.$axios.get(`/tags/all`).then((response) => {
        const tagData = response.data.data;
        this.tagData = tagData;
      });
    },
  },
};
</script>


<style>
#navbar-ntucs-council {
  background: #fff;
  padding: 0.5rem 1rem;
}

.btn-group.special {
  display: flex;
}

.special .btn {
  flex: 1;
}
.navbar-nav .dropdown-menu {
  position: absolute !important;
}
.modal-backdrop {
  opacity: 0.12 !important;
}
</style>
