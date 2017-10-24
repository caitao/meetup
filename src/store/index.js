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
            title: data[key].title,
            location: data[key].location,
            imageUrl: data[key].imageUrl,
            date: data[key].date,
            description: data[key].description,
            creatorId: data[key].creatorId
          })
        }
        commit('setLoadMeetups', meetups)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createMeetup ({commit, getters}, payload) {
      let imageUrl
      let key
      const Meetup = AV.Object.extend('Meetups')
      let meetup = new Meetup()
      meetup.set('title', payload.title)
      meetup.set('location', payload.location)
      meetup.set('description', payload.description)
      meetup.set('date', payload.date.toString())
      meetup.set('creatorId', getters.user.id)
      meetup.save()
      // wilddog.sync().ref('meetups').push(meetup)
        .then((data) => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          console.log(data)
          key = data.key
          const file = new AV.File(key + '.' + ext, payload.image)
          file.save().then((file) => {
            imageUrl = file.url
            console.log(imageUrl)
          })
        })
        .then(() => {
          imageUrl =
          commit('addMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
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
