
// initial state
const state = () => {
  return {
    newArticleId: '',
    addArticleFailed: false
  }
}

// getters
const getters = {
}

// actions
const actions = {
  async nuxtServerInit ({ dispatch }) {
  },
  newArticle ({ commit }) {
    this.$axios.post('/articles/new', {}, {
      headers: {
        authorization: this.$storage.getLocalStorage('accessToken')
      }
    }).then(i => {
      commit('setNewArticleId', i.data.data.articleId)
    }).catch(e => {
      commit('setAddArticleFailed')
    })
  }
}

// mutations
const mutations = {
  setNewArticleId (state, payload) {
    state.newArticleId = payload
  },
  setAddArticleFailed (state) {
    state.addArticleFailed = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
