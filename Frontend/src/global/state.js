const state = {
  user: '',
  rooms: [],
}

const getters = {
  getUser: function () {
    return state.user
  }
}

const setters = {
  setUser: function (user) {
    return new Promise((res, rej) => {
      state.user = user
      res()
    })
  },
  setRoom: function (rooms) {
    return new Promise((resolve, reject) => {
      state.rooms = rooms
      resolve()
      if (!state.rooms) {
        reject('Can\'t')
      }
    })
  }
}

export default { getters, setters }