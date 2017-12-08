import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AV from 'leancloud-storage'
import EditMeetupDetailDialog from './components/Meetup/Edit/EditMeetupDetailDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/meetup/edit/EditMeetupTimeDialog.vue'
import RegistorDialog from './components/meetup/registration/RegistorDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('dateFilter', DateFilter)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailDialog)
Vue.component('add-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('add-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('add-meetup-register-dialog', RegistorDialog)
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
