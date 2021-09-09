<template>
  <div class="sticky top-0 z-50">
    <no-ssr>
      <div class="bg-white ">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          <div>
            <nav class="flex justify-center py-3 ">
              <input 
                type="button"
                @click="$router.push('/')" 
                :class= "[$route.path === '/' ? 's-navbtn' : 'text-black bg-white navbtn']"
                value="首頁"
              />
              <input 
                type="button"
                @click="$router.push('/announcement')" 
                :class= "[$route.path === '/announcement' ? 's-navbtn' : 'text-black bg-white navbtn']"
                value="公告"
              />
              <input 
                type="button"
                @click="$router.push('/events')" 
                :class= "[$route.path === '/events' ? 's-navbtn' : 'text-black bg-white navbtn']"
                value="活動"
              />
            </nav>
          </div>
          <div class="p-3 text-center text-xl font-semibold hidden sm:col-span-1 sm:block md:text-2xl md:col-span-2">
            <span>台灣大學資訊工程系學會</span>
          </div>
          <div>
            <nav class="flex justify-center py-3">
              <span :class="[$route.path === '/academic' ? 's-navbtn' : 'text-black bg-white navbtn'] ">
                <departments/>
              </span>
              <span :class="[$route.path === '/articles' ? 's-navbtn' : 'text-black bg-white navbtn'] ">
                <service />
              </span>
              <input 
                type="button"
                @click="tempSignIn"
                class="navbtn text-white bg-secondary"
                value="登入"
                v-if="!usersState.isLoggedIn"
              />
              <span class="navbtn text-white bg-secondary" v-else>
                <userManager/>
              </span>
            </nav>
          </div>
        </div>

              <!-- <b-nav-item-dropdown right v-if="usersState.isLoggedIn">
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
              </b-nav-item-dropdown --->
      </div>
    </no-ssr>
  </div>
</template>

<script>
import { mapState } from "vuex";
import departments from './navbar/departments.vue';
import service from './navbar/service.vue';
import userManager from './navbar/userManager.vue';

export default {
  name: "navbar",
  components: { departments, service, userManager },
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
    route: function() {
      console.log(this.$router.currentRoute.path)
      return this.$router.currentRoute.path
    }
  },
  mounted() {
    this.getTags();
    console.log(this.$router.currentRoute.path)
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
.navbtn{
  @apply rounded-md py-1 px-2 text-base cursor-pointer tracking-wider font-bold hover:text-blue-400 md:mx-1 lg:mx-2;
}

.s-navbtn{
  @apply text-white bg-primary  rounded-md py-1 px-2 text-base cursor-pointer tracking-wider font-bold hover:text-blue-400 md:mx-1 lg:mx-2;
}
</style>
