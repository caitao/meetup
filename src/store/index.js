import Vue from 'vue'
import Vuex from 'vuex'
import * as AV from 'leancloud-storage'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [],
    user: null
    // errorUserCreate: null
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
      console.log(payload)
      window.localStorage.setItem('User', payload)
    }
  },

  actions: {
    loadMeetups ({commit}) {
      const query = AV.Query('Meetups')
      query.find()
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
            description: obj[key].description,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadMeetups', meetups)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createMeetup ({commit, getters}, payload) {
      const Meetup = AV.Object.extend('Meetups')
      let meetup = new Meetup()
      meetup.set('title', payload.title)
      meetup.set('location', payload.location)
      meetup.set('imageUrl', payload.imageUrl)
      meetup.set('description', payload.description)
      meetup.set('date', payload.date.toString())
      meetup.set('creatorId', getters.user.id)
      meetup.save()
      // wilddog.sync().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          commit('addMeetup', meetup)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      AV.User.signUp(payload.username, payload.password)
      // wilddog.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          loginedUser => {
            const newUser = {
              id: loginedUser.objectId,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            alert(JSON.stringify(error))
          }
        )
    },
    signUserIn ({commit}, payload) {
      AV.User.logIn(payload.username, payload.password)
      // wilddog.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
            loginedUser => {
              const newUser = {id: loginedUser.username, registeredMeetups: []}
              commit('setUser', newUser)
            },
            error => {
              console.log(error)
            }
          )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.objectId, registeredMeetups: []})
    },
    logOut ({commit}) {
      AV.User.logOut()
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
    }
  }
})
