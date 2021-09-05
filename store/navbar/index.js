
// initial state
const state = () => {
  return {
    accountFormType: 'register',
    accountFormText: '加入系學會'
  }
}

// getters
const getters = {
}

// actions
const actions = {
  async nuxtServerInit ({ dispatch }) {
  }
}

// mutations
const mutations = {
  setAccountFormType (state, payload) {
    state.accountFormType = payload
  },
  setAccountFormText (state, payload) {
    if (payload === 'signin') {
      state.accountFormText = '登入臺大資工系學會'
    }
    if (payload === 'register') {
      state.accountFormText = '加入系學會'
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
