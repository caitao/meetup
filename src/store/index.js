import Vue from 'vue'
import Vuex from 'vuex'
import * as wilddog from 'wilddog'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [
      {id: 'sadfasdfw21', title: 'Meetup In BeiJing', location: 'BeiJing', imageUrl: '../../static/doc-images/carousel/beijing.jpg', date: new Date(), description: 'This is a description! Welcome to meetup website.'},
      {id: 'wqjkpsck23', title: 'Meetup In ShangHai', location: 'Shanghai', imageUrl: '../../static/doc-images/carousel/shanghai.jpg', date: new Date(), description: 'This is a description! Welcome to meetup website.'},
      {id: 'kapadsap13', title: 'Meetup In ShengZhen', location: 'Shengzhen', imageUrl: '../../static/doc-images/carousel/shengzhen.jpg', date: new Date(), description: 'This is a description! Welcome to meetup website.'},
      {id: 'skjpqjwk42', title: 'Meetup In HongKong', location: 'HongKong', imageUrl: '../../static/doc-images/carousel/hongkong.jpg', date: new Date(), description: 'This is a description! Welcome to meetup website.'}
    ],
    user: null,
    errorUserCreate: null
    // emailExist: false
  },

  mutations: {
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
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toString()
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
