// import { store } from '../store'

export default (to, from, next) => {
  if (window.localStorage.User !== 'null') {
    next()
  } else {
    next('/signin')
    // console.log(window.localStorage.User)
  }
}
