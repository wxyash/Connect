const socketio = require('socket.io')
const { ConnectionHistory } = require('../models/history')
const { VerifyUser } = require('../middleware/auth')
const { ChatRoom } = require('../models/room')
let roomConnections = async function (io) {
  let rooms = await ChatRoom.find({})
  if (rooms.length > 0) {
    for (const room of rooms) {
      io.of(room.name).on('connection', (socket) => {
        socket.on('chat', (data) => {
          console.log(data, 'Knock knock')
          socket.emit('chat', data)
        })
      })
    }
  }
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

    socket.on('typing', (data) => {
      io.sockets.emit('typing', data)
    })

    socket.on('refresh_rooms', async (data) => {
      await roomConnections(io)
    })

    // socket.on('chat', (data) => {
    //   socket.broadcast.emit('chat', data)
    // })

    await roomConnections(io)
  })
}

