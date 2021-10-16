<template>
  <div class="sticky top-0 uncover">
    <no-ssr>
      <div class="bg-white shadow-lg">
        <div class="">
          <div class="py-3 col-span-1 sm:hidden">
            <div class="text-center font-semibold text-xl md:text-2xl ml-1/2">
              <button 
                class="sm:hidden pl-3 float-left"
                @click="isOpen = !isOpen" 
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              <span class="">台灣大學資訊工程系學會</span>
            </div>
          </div>
          <div :class="isOpen? 'py-3':'py-0 sm:py-3'" class="bg-white absolute sm:relative px-1 grid grid-cols-1 sm:grid-cols-3">
            <div :class="isOpen? 'block':'hidden'" class="sm:block">
              <nav class="flex flex-col sm:flex-row justify-evenly sm:justify-start">
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
            <div class="font-semibold hidden sm:block text-xl md:text-2xl text-center">
              <span class="">台灣大學資訊工程系學會</span>
            </div>
            <div :class="isOpen? 'block':'hidden'" class="sm:block">
              <nav class="flex flex-col sm:flex-row justify-evenly sm:justify-end">
                <input 
                  type="button"
                  @click="$router.push('/services')" 
                  :class= "[$route.path === '/services' ? 's-navbtn' : 'text-black bg-white navbtn']"
                  class="-mr-1"
                  value="服務"
                />
                <span :class="[$route.path.split('/')[1] === 'departments' ? 's-navbtn' : 'text-black bg-white navbtn']" class="flex-shrink-0">
                  <departments/>
                </span>
                <input 
                  type="button"
                  @click="handleClickSignIn"
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
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import { mapState } from "vuex"
import departments from './navbar/departments.vue'
import userManager from './navbar/userManager.vue'

export default {
  name: "secondnavbar",
  components: { departments, userManager },
  data() {
    return {
      tagData: [],
      isOpen: false
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
    console.log(this.$route.path.split('/')[1])
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
  @apply rounded-md py-1 px-1 md:px-2 text-base cursor-pointer tracking-wider font-bold hover:text-blue-400 mx-1 md:mx-2 lg:mx-3 ;
}

.s-navbtn{
  @apply text-white bg-primary rounded-md py-1 px-2 text-base cursor-pointer tracking-wider font-bold hover:text-blue-400 mx-1 md:mx-2 lg:mx-3;
}

.uncover {
  z-index: 9;
}
</style>
