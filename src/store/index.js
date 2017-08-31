import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {src: '../../static/doc-images/carousel/beijing.jpg', id: 'sadfasdfw21', title: 'Meetup In BeiJing', date: '2017-08-23'},
      {src: '../../static/doc-images/carousel/shanghai.jpg', id: 'wqjkpsck23', title: 'Meetup In ShangHai', date: '2017-08-24'},
      {src: '../../static/doc-images/carousel/shengzhen.jpg', id: 'kapadsap13', title: 'Meetup In ShengZhen', date: '2017-08-25'},
      {src: '../../static/doc-images/carousel/hongkong.jpg', id: 'skjpqjwk42', title: 'Meetup In HongKong', date: '2017-08-27'}
    ],
    user: {
      id: 'asdkfswq12',
      registeredMeetups: ['skjpqjwk42']
    }
  },
  mutations: {

  },
  actions: {

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
