<template>
  <div class="group relative z-50">
    <span>
      {{usersState.user.lastName}}{{usersState.user.firstName}}
    </span>
    <span class="float-right mt-1">
      <svg
        class="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </span>
    <ul
      class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
    transition duration-150 ease-in-out origin-top right-1"
    >
      <li v-if="usersState.user.role === 'admin'" class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="$router.push('/')" 
          value="管理介面"
        />
      </li>
      <li v-if="usersState.user.role !== 'user'" class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="addArticle()" 
          value="擴寫文章"
        />
      </li>
      <li v-if="usersState.user.role !== 'user'" class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="$router.push('/')" 
          value="我的文章"
        />
      </li>
      <li class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="$router.push('/dashboard/settings/')" 
          value="帳號設定"
        />
      </li>
      <li class="text-black align-center px-3 py-1 hover:text-blue-400">
        <input 
          type="button"
          class="bg-white"
          @click="userSignout" 
          value="登出"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: 'userManager',
  props: ['title', 'list'],
  computed: {
    ...mapState({
      usersState: "users",
    }),
  },
  methods: {
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
  },
}
</script>
<style>
  li>ul                 { transform: translatex(100%) scale(0) }
  li:hover>ul           { transform: translatex(101%) scale(1) }
  li > button svg       { transform: rotate(-90deg) }
  li:hover > button svg { transform: rotate(-270deg) }
  .group:hover .group-hover\:scale-100 { transform: scale(1) }
  .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
  .scale-0 { transform: scale(0) }
  .min-w-32 { min-width: 8rem }
</style>

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
                </a--->