import Vue from 'vue'
import Vuex from 'vuex'
import AV from 'leancloud-storage'

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
      window.localStorage.setItem('User', payload)
    }
  },

  actions: {
    loadMeetups ({commit}) {
      const query = new AV.Query('Meetups').ascending('date')
      query.find()
      .then((data) => {
        const meetups = []
        for (let key in data) {
          meetups.push({
            id: key,
            title: data[key].attributes.title,
            location: data[key].attributes.location,
            imageLink: data[key].attributes.imageLink,
            date: data[key].attributes.date,
            description: data[key].attributes.description,
            creatorId: data[key].attributes.creatorId
          })
        }
        commit('setLoadMeetups', meetups)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createMeetup ({commit, getters}, payload) {
      let objectId
      let imageUrl
      const meetup = {
        imageLink: '',
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toString(),
        creatorId: getters.user.id
      }
      const Meetup = AV.Object.extend('Meetups')
      new Meetup(meetup).save()
        .then((data) => {
          objectId = data.id
          return objectId
        })
        .then(objectId => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          const file = new AV.File(objectId + ext, payload.image)
          return file.save()
        })
        .then(file => {
          imageUrl = file.url()
          AV.Object.createWithoutData('Meetups', objectId).save({
            imageLink: imageUrl
          }).catch(alert)
          console.log(imageUrl)
        })
        .then(() => {
          commit('addMeetup', {
            ...meetup,
            imageLink: imageUrl,
            id: objectId
          })
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
              id: loginedUser.id,
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
              const newUser = {id: loginedUser.id, registeredMeetups: []}
              commit('setUser', newUser)
            },
            error => {
              console.log(error)
            }
          )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.id, registeredMeetups: []})
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
