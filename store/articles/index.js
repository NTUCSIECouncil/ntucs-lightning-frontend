
// initial state
const state = () => {
  return {
    newArticleId: '',
    addArticleFailed: false,
    estimatedReadingTime: 0,
    wordCount: 0,
    isUpdated: false,
    isUpdatedError: false,
    isTyping: false
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
  },
  updateArticle ({ commit }, payload) {
    return this.$axios.patch(`/articles/edit/${payload.articleId}`, { data: payload }, {
      headers: {
        authorization: this.$storage.getLocalStorage('accessToken')
      }
    }).then(i => {
      commit('setUpdateStatus', true)
      return i
    }).catch(e => {
      commit('setUpdateError', true)
      commit('setUpdateStatus', false)
      throw e
    })
  },
  calcEstimatedReadingTime ({ commit }, payload) {
    let wordCount = payload
    let time = wordCount / 200
    commit('setWordCount', payload)

    if (wordCount === 0) {
      commit('setEstimatedReadingTime', 0)
    } else if (time < 1) {
      commit('setEstimatedReadingTime', 1)
    } else {
      commit('setEstimatedReadingTime', Math.ceil(time))
    }
  }
}

// mutations
const mutations = {
  setAddArticleFailed (state) {
    state.addArticleFailed = true
  },
  setEstimatedReadingTime (state, payload) {
    state.estimatedReadingTime = payload
  },
  setWordCount (state, payload) {
    state.wordCount = payload
  },
  setUpdateStatus (state, payload) {
    state.isUpdated = payload
  },
  setUpdateError (state) {
    state.isUpdatedError = true
  },
  setTypingStatus (state, payload) {
    state.isTyping = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
