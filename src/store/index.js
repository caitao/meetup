import Vue from 'vue'
import Vuex from 'vuex'
import AV from 'leancloud-storage'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetups: [],
    loading: false,
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
    updateMeetup (state, payload) {
      const meetup = this.state.meetups.find(meetup => {
        return meetup.objectId === payload.objectId
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('User', payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },

  actions: {
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      AV.Object.createWithoutData('Meetups', payload.objectId).save(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    loadMeetups ({commit}) {
      commit('setLoading', true)
      const query = new AV.Query('Meetups').ascending('date')
      query.find()
      .then((data) => {
        const meetups = []
        for (let key in data) {
          meetups.push({
            objectId: data[key].id,
            title: data[key].attributes.title,
            location: data[key].attributes.location,
            imageLink: data[key].attributes.imageLink,
            date: data[key].attributes.date,
            description: data[key].attributes.description,
            creatorId: data[key].attributes.creatorId
          })
        }
        console.log(meetups)
        commit('setLoadMeetups', meetups)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
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
          return meetup.objectId === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    }
  }
})
