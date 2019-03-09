const socketio = require('socket.io')
const { ConnectionHistory } = require('../models/history')
const { VerifyUser } = require('../middleware/auth')
const { ChatRoom } = require('../models/room')
let roomConnections = async function (io) {
}

module.exports.initSocketIO = async function (server) {
  let io = socketio(server)
  io.use(async (socket, next) => {
    let query = socket.handshake.query
    let user
    try {
      user = await VerifyUser(query)
      if (!user) {
        next()
        socket.emit('closeReason', 'User not found')
        socket.disconnect()
        return next(new Error('User Not Found.'))
      }
    } catch (error) {
      next()
      socket.emit('closeReason', error.message)
      socket.disconnect()
      return next(new Error('Authentication Error'))
    }
    let data = {
      connection_type: 'socket_join',
      socket_id: socket.id,
      user_id: user.id
    }
    let history
    try {
      history = await new ConnectionHistory(data)
      if (!history) {
        next()
        socket.emit('closeReason', 'Error saving history')
        socket.disconnect()
        return next(new Error('History Error'))
      }
    } catch (error) {
      next()
      socket.emit('closeReason', error.message)
      socket.disconnect()
      return next(new Error('History Error'))
    }

    let savedHistory
    try {
      savedHistory = await history.save()
      if (!savedHistory) {
        socket.disconnect()
        return next(new Error('History Error'))
      }
    } catch (error) {
      socket.disconnect()
      return next(new Error('History Error'))
    }
    socket.emit('welcome', user)
    next()

    socket.on('join_room', async (room) => {
      console.log(room)
      let rooms = await ChatRoom.find({})
      let roomsNames = rooms.map((item) => item.name)
      if (roomsNames.includes(room)) {
        socket.join(room)
        io.of('/').in(room).emit('user_join', 'A new user has joined the chat')
        socket.in(room).on('chat', (data) => {
          io.of('/').in(room).emit('chat', data)
        })
        socket.in(room).on('typing', (data) => {
          socket.broadcast.to(room, data)
        })
      }
    })
    socket.on('leave_room', async (room) => {
      let rooms = await ChatRoom.find({})
      let roomsNames = rooms.map((item) => item.name)
      if (roomsNames.includes(room)) {
        io.of('/').in(room).emit('user_leave', 'A user has left the chat')
        socket.leave(room)
      }
    })
  })
}

