import axios from 'axios'

export const URL = 'http://localhost:3001'
export const API = {
  user: {
    login: function (data) {
      return axios.post(URL + '/user/login', data)
    },
    register: function (data) {
      return axios.post(URL + '/user/register', data)
    }
  }
}