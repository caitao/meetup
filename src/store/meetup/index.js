import AV from 'leancloud-storage'
export default {
  state: {
    meetups: []
  },

  mutations: {
    setLoadMeetups (state, payload) {
      state.meetups = payload
    },
    addMeetup (state, payload) {
      state.meetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = this.state.meetups.find(meetup => {
        return meetup.objectId === payload.objectId
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    registeMeetup (state, payload) {
      const meetup = this.state.meetups.find(meetup => {
        return meetup.objectId === payload.objectId
      })
      meetup.registerId.push(payload.userId)
    },
    unRegisteMeetup (state, payload) {
      const meetup = this.state.meetups.find(meetup => {
        return meetup.objectId === payload.objectId
      })
      meetup.registerId.splice(meetup.registerId.indexOf(payload.userId), 1)
    }
  },

  actions: {
    // 在meetup数据中存入一个数组，用于存储参与这个meetup的人员清单
    register ({commit}, payload) {
      const updateRegister = payload.registerId
      if (updateRegister.findIndex(userId => userId === payload.userId) < 0) {
        commit('setLoading', true)
        updateRegister.push(payload.userId)
        AV.Object.createWithoutData('Meetups', payload.objectId).save({
          registerId: updateRegister
        })
        .then(() => {
          commit('setLoading', false)
          commit('registeMeetup', payload)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
      }
    },
    unRegister ({commit}, payload) {
      commit('setLoading', true)
      const updateRegister = payload.registerId
      updateRegister.splice(updateRegister.indexOf(payload.userId), 1)
      AV.Object.createWithoutData('Meetups', payload.objectId).save({
        registerId: updateRegister
      })
      .then(() => {
        commit('setLoading', false)
        commit('unRegisteMeetup', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date.toString()
      }
      AV.Object.createWithoutData('Meetups', payload.objectId).save(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    loadMeetups ({commit}) {
      commit('setLoading', true)
      const query = new AV.Query('Meetups').ascending('date')
      query.find()
      .then((data) => {
        const meetups = []
        for (let key in data) {
          meetups.push({
            objectId: data[key].id, // 在leancloud AV.Query方法中得到的数据格式下，这样才能返回objectId
            title: data[key].attributes.title,
            location: data[key].attributes.location,
            imageLink: data[key].attributes.imageLink,
            date: data[key].attributes.date,
            description: data[key].attributes.description,
            creatorId: data[key].attributes.creatorId,
            registerId: data[key].attributes.registerId
          })
        }
        commit('setLoadMeetups', meetups)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    createMeetup ({commit, getters}, payload) {
      let objectId
      let imageUrl
      const meetup = {
        imageLink: '',
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toString(),
        creatorId: getters.user.id,
        registerId: [getters.user.id]
      }
      const Meetup = AV.Object.extend('Meetups')
      new Meetup(meetup).save()
        .then((data) => {
          objectId = data.id
          return objectId
        })
        .then(objectId => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          const file = new AV.File(objectId + ext, payload.image)
          return file.save()
        })
        .then(file => {
          imageUrl = file.url()
          AV.Object.createWithoutData('Meetups', objectId).save({
            imageLink: imageUrl
          }).catch(alert)
        })
        .then(() => {
          commit('addMeetup', {
            ...meetup,
            imageLink: imageUrl,
            id: objectId
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  getters: {
    loadedMeetups (state) {
      return state.meetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.meetups.find((meetup) => {
          return meetup.objectId === meetupId
        })
      }
    }
  }
}
