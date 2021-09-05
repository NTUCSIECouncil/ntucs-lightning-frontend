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
              <img
                v-if="!usersState.isLoggedIn"
                src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png?hl=bg"
                alt="Sign in with Google"
                @click="tempSignIn"
              />

              <b-nav-item-dropdown right v-if="usersState.isLoggedIn">
                <template slot="button-content">
                  {{ usersState.user.name.last }}
                  {{ usersState.user.name.first }}
                </template>
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
    tempSignIn() {
      window.alert("因為我已經把登入表單刪掉了 所以先用window.prompt登入吧");
      this.$store.dispatch("users/userSignin", {
        email: window.prompt("email"),
        password: window.prompt("password"),
      });
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
