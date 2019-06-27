
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
    return this.$axios.post('/articles/new', {}, {
      headers: {
        authorization: this.$storage.getLocalStorage('accessToken')
      }
    }).then(i => {
      commit('setNewArticleId', i.data.data.articleId)
      return i
    }).catch(e => {
      commit('setAddArticleFailed')
      throw e
    })
  }
}

// mutations
const mutations = {
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
