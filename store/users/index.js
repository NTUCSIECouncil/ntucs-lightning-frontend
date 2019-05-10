
// initial state
const state = () => {
  return {
    accountFormType: 'register',
    accountFormText: '成為讀者',

    isLoggedIn: null,
    accessToken: '',
    user: {
      name: {
        preferred: '',
        last: '',
        first: ''
      }
    }
  }
}

// getters
const getters = {
}

// actions
const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('checkLoginStatus')
  },
  checkLoginStatus ({ commit }) {
    let accessToken = this.$storage.getUniversal('accessToken') || ''
    let user = this.$storage.getUniversal('user') || ''
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
    this.$storage.setUniversal('accessToken', payload)
    state.accessToken = payload
  },
  setUserData (state, payload) {
    this.$storage.setUniversal('user', payload)
    state.user = payload
  },
  setLoginStatus (state, payload) {
    state.isLoggedIn = payload
  },
  removeUserAccessToken (state) {
    this.$storage.removeUniversal('accessToken')
    this.$storage.removeUniversal('user')
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
