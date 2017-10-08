import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    next()
    console.log(store.getters.user)
  } else {
    next('/signin')
    console.log(store.getters.user)
  }
}
