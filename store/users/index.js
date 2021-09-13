
// initial state
const state = () => {
  return {
    isAuthFailed: false,
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
    const accessToken = this.$storage.getUniversal('accessToken') || ''
    const user = this.$storage.getUniversal('user') || ''
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
  userSignin ({ commit, dispatch }, idToken) {
    this.$axios.post('/auth/google', {
      idToken
    })
      .then(i => {
        const userData = i.data.data
        commit('setUserAccessToken', userData.accessToken)
        delete userData.accessToken
        dispatch('userGetMe')
        commit('setLoginStatus', true)
      })
  },
  userGetMe ({ commit }) {
    this.$axios.get('/users/me')
      .then(i => {
        const userData = i.data.data
        commit('setUserData', userData)
      })
  }
}

// mutations
const mutations = {
  setUserAccessToken (state, payload) {
    this.$storage.setUniversal('accessToken', payload)
    state.accessToken = payload
    this.$axios.defaults.headers.common.authorization = payload
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
    this.$axios.defaults.headers.common.authorization = undefined
  },
  userAuthFailed (state) {
    state.isAuthFailed = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
