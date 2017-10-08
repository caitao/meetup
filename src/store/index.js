import Vue from 'vue'
import Vuex from 'vuex'
import * as wilddog from 'wilddog'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [],
    user: null,
    errorUserCreate: null
    // emailExist: false
  },

  mutations: {
    setLoadMeetups (state, payload) {
      state.meetups = payload
    },
    addMeetup (state, payload) {
      state.meetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setErrorUserCreate (state, payload) {
      state.errorUserCreate = payload
    }
  },

  actions: {
    loadMeetups ({commit}) {
      wilddog.sync().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            description: obj[key].description
          })
        }
        commit('setLoadMeetups', meetups)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toString(),
        creatorId: getters.user.id
      }
      wilddog.sync().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          commit('addMeetup', meetup)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      wilddog.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setErrorUserCreate', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      wilddog.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logOut ({commit}) {
      wilddog.auth().signOut()
      commit('setUser', null)
    }
    // checkIfUserExists ({commit}, payload) {
    //   wilddog.child(payload.email).once('value', snapshot => {
    //     let exists = (snapshot.val() !== null)
    //     commit('emailExist', exists)
    //   }
    //   )
    // }
  },

  getters: {
    loadedMeetups (state) {
      return state.meetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.meetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    errorUserCreate (state) {
      return state.errorUserCreate
    }
  }
})
