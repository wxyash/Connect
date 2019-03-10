import axios from 'axios'

export const URL = 'http://localhost:3001'
export const API = {
  user: {
    login: function (data) {
      return axios.post(URL + '/user/login', data)
    },
    register: function (data) {
      return axios.post(URL + '/user/register', data)
    },
    findByEmail: function (email) {
      return axios.post(URL + `/user/find`, email)
    }
  },
  rooms: {
    create: function (data) {
      return axios.post(URL + '/room/create', data)
    },
    find: function () {
      return axios.get(URL + '/room/find')
    }
  }
}