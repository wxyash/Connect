import { URL } from './api'
import io from 'socket.io-client';

let socket_instance

export const socket = {
  methods: {
    connect: function (loginData) {
      socket_instance = io(URL, { query: loginData })
      return socket_instance
    }
  },
  getters: {
    getSocket: function () {
      return socket_instance
    }
  }
}
export default socket