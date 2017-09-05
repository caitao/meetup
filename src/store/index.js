import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {id: 'sadfasdfw21', title: 'Meetup In BeiJing', imageUrl: '../../static/doc-images/carousel/beijing.jpg', date: '2017-08-23'},
      {id: 'wqjkpsck23', title: 'Meetup In ShangHai', imageUrl: '../../static/doc-images/carousel/shanghai.jpg', date: '2017-08-24'},
      {id: 'kapadsap13', title: 'Meetup In ShengZhen', imageUrl: '../../static/doc-images/carousel/shengzhen.jpg', date: '2017-08-25'},
      {id: 'skjpqjwk42', title: 'Meetup In HongKong', imageUrl: '../../static/doc-images/carousel/hongkong.jpg', date: '2017-08-27'}
    ],
    user: {
      id: 'asdkfswq12',
      registeredMeetups: ['skjpqjwk42']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'kqsipqsd43'
      }
      commit('createMeetup', meetup)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
})
