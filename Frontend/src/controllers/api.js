import axios from 'axios'

const URL = 'http://localhost:3000'
export const APP = {
  user: {
    login: function (data) {
      axios.post(URL + '/user/login', data)
    }
  }
}