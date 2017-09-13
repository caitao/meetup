import Vue from 'vue'
import Vuetify from 'vuetify'
import * as wilddog from 'wilddog'
import * as WildVue from 'wildvue'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'

Vue.use(Vuetify)
Vue.use(WildVue)
Vue.config.productionTip = false
Vue.filter('dateFilter', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    wilddog.initializeApp({
      syncURL: 'https://wd9504485366mhjfht.wilddogio.com',
      authDomain: 'wd9504485366mhjfht.wilddog.com'
    })
  }
})
