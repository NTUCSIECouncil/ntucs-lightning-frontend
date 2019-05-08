
// initial state
const state = {
  accountFormType: 'register',
  accountFormText: '成為讀者',

  isLoggedIn: false,
  accessToken: '',
  user: {
    name: {
      preferred: '',
      last: '',
      first: ''
    }
  }
}

// getters
const getters = {
}

// actions
const actions = {
  checkLoginStatus ({ commit }) {
    let accessToken = this.$storage.getLocalStorage('accessToken') || ''
    let user = this.$storage.getLocalStorage('user') || ''
    if (accessToken && user) {
      commit('setUserAccessToken', accessToken)
      commit('setUserData', user)
      commit('setLoginStatus', true)
    } else {
      commit('setLoginStatus', false)
    }
  },
  userSignout ({ commit }) {
    commit('removeUserAccessToken')
    commit('setLoginStatus', false)
  },
  userSignin ({ commit }, payload) {
    this.$axios.post('/auth/signin', { data: payload })
      .then(i => {
        let userData = i.data.data
        commit('setUserAccessToken', userData.accessToken)
        delete userData.accessToken
        commit('setUserData', userData)
        commit('setLoginStatus', true)
      })
  },
  userRegister ({ commit }, payload) {
    this.$axios.post('/auth/register', { data: payload })
      .then(i => {
        let userData = i.data.data
        commit('setUserAccessToken', userData.accessToken)
        delete userData.accessToken
        commit('setUserData', userData)
        commit('setLoginStatus', true)
      })
  }
}

// mutations
const mutations = {
  setAccountFormType (state, payload) {
    state.accountFormType = payload
  },
  setAccountFormText (state, payload) {
    if (payload === 'signin') {
      state.accountFormText = '登入 TheChanger 改變者'
    }
    if (payload === 'register') {
      state.accountFormText = '成為讀者'
    }
  },
  setUserAccessToken (state, payload) {
    this.$storage.setLocalStorage('accessToken', payload)
    state.accessToken = payload
  },
  setUserData (state, payload) {
    this.$storage.setLocalStorage('user', payload)
    state.user = payload
  },
  setLoginStatus (state, payload) {
    state.isLoggedIn = payload
  },
  removeUserAccessToken (state) {
    this.$storage.removeLocalStorage('accessToken')
    this.$storage.removeLocalStorage('user')
    state.accessToken = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
