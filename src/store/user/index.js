import AV from 'leancloud-storage'
export default {
  state: {
    user: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('User', payload)
    }
  },

  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      AV.User.signUp(payload.username, payload.password)
      // wilddog.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          loginedUser => {
            commit('setLoading', false)
            const newUser = {
              id: loginedUser.id,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            alert(JSON.stringify(error))
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      AV.User.logIn(payload.username, payload.password)
      // wilddog.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(loginedUser => {
          commit('setLoading', false)
          const newUser = {id: loginedUser.id, registeredMeetups: []}
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.id, registeredMeetups: []})
    },
    logOut ({commit}) {
      AV.User.logOut()
      commit('setUser', null)
    }
  },

  getters: {
    user (state) {
      return state.user
    }
  }
}
