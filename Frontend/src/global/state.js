const state = {
  user: '',
  rooms: [],
  messages: []
}

const getters = {
  getUser: function () {
    return state.user
  },
  getMessages: function () {
    return state.messages
  },
  getRooms: function () {
    return state.rooms
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
  },
  addMessage(message) {
    return new Promise((res, rej) => {
      state.messages.push(message)
      res()
    })
  },
  addRoom(room) {
    return new Promise((res, rej) => {
      state.rooms.push(room)
      res()
    })
  }
}

export default { getters, setters }