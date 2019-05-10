
// initial state
const state = () => {
  return {
    accountFormType: 'register',
    accountFormText: '成為讀者'
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
      state.accountFormText = '登入 TheChanger 改變者'
    }
    if (payload === 'register') {
      state.accountFormText = '成為讀者'
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
