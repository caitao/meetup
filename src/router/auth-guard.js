// import { store } from '../store'

export default (to, from, next) => {
  if (window.localStorage.User !== 'null') {
    next()
    console.log(window.localStorage.User)
  } else {
    next('/signin')
    // console.log(window.localStorage.User)
  }
}
