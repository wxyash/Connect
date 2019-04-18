import axios from 'axios'

export const URL = 'http://localhost:3001'

export const headers = {
  getHeaders: () => {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest'
    }
  },
  getAuthHeaders: () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*'
    }
  }
} 

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
    },
    findAll: function(){
      return axios.post(URL + '/user/findAll')
    }
  },
  admin: {
    adminRegister: function(data) {
      return axios.post(URL + '/admin/register', data);
    },
    adminLogin: function(data){
      return axios.post(URL + '/admin/login', data);
    },
    varifyToken: function(){
      return axios.get(URL + '/admin/verify', {headers: headers.getAuthHeaders()})
    },
    findAll: function(){
      return axios.get(URL + '/admin/findAll')
    }
  },
  rooms: {
    create: function (data) {
      return axios.post(URL + '/room/create', data)
    },
    find: function () {
      return axios.get(URL + '/room/find')
    }
  },
  history: {
    eventHistory: function(){
      return axios.post(URL + '/history/chat-history', {headers: headers.getHeaders()})
    },
    chatHistory: function () {
      return axios.get(URL + '/history/chat-history')
    },
    eventHistoryPaginated (itemPerPage) {
      return axios.get(URL + `/history/chat-history-paginated/${itemPerPage}`)
    }
  }
}