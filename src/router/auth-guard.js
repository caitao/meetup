import { store } from '../store'
import * as wilddog from 'wilddog'

export default (to, from, next) => {
  if (store.getters.user) {
    next()
    console.log(store.getters.user)
  } else if (wilddog.session.signIn) {
    next()
    console.log(store.getters.user)
  } else {
    next('/signin')
  }
}
