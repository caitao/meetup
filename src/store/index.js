import Vue from 'vue'
import Vuex from 'vuex'

import meetup from './meetup'
import user from './user'
import share from './share'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    share: share
  }
})
