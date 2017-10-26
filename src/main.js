import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AV from 'leancloud-storage'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('dateFilter', DateFilter)
const appId = 'OyLU8hceo70Qhf0shL1GhKwh-gzGzoHsz'
const appKey = 'dAzhSgD2SXMMVSOd5WsPKlYK'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    AV.init({appId, appKey})
    this.$store.dispatch('loadMeetups')
    let currentUser = AV.User.current()
    if (currentUser) {
      this.$store.dispatch('autoSignin', currentUser)
    }
  }
  //   wilddog.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.$store.dispatch('autoSignin', user)
  //     }
  //   })
  //   this.$store.dispatch('loadMeetups')
})
