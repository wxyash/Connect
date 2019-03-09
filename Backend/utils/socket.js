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

    socket.on('join_room', async (data) => {
      let rooms = await ChatRoom.find({})
      let roomsNames = rooms.map((item) => item.name)
      if (roomsNames.includes(data.room)) {
        socket.join(data.room)
        // SAVE TO HISTORY DB
        let Sroom = rooms.find((item) => item.name === data.room)
        let historyData = {
          connection_type: 'user_join',
          socket_id: socket.id,
          user_id: user.id,
          room_id: Sroom._id
        }
        let saveHistory = await new ConnectionHistory(historyData).save()
        io.emit('user_join', `${data.user.toUpperCase()} has JOINED the ${data.room.toUpperCase()} at ${new Date().toISOString()}`)
        socket.in(data.room).on('chat', (sendData) => {
          console.log('HERE IN THE CHAT', sendData)
          io.of('/').in(data.room).emit('chat', sendData)
        })
        socket.in(data.room).on('typing', (sendData) => {
          socket.to(data.room).emit('typing', sendData)
        })
      }
    })
    socket.on('leave_room', async (data) => {
      let rooms = await ChatRoom.find({})
      let roomsNames = rooms.map((item) => item.name)
      if (roomsNames.includes(data.room)) {
        let Sroom = rooms.find((item) => item.name === data.room)
        let historyData = {
          connection_type: 'user_leave',
          socket_id: socket.id,
          user_id: user.id,
          room_id: Sroom._id
        }
        let saveHistory = await new ConnectionHistory(historyData).save()
        io.emit('user_leave', `${data.user.toUpperCase()} has LEFT the ${data.room.toUpperCase()} at ${new Date().toISOString()}`)
        socket.leave(data.room)
      }
    })
    socket.on('disconnect', async () => {
      let historyData = {
        connection_type: 'socket_leave',
        socket_id: socket.id,
        user_id: user.id,
      }
      let saveHistory = await new ConnectionHistory(historyData).save()
    })
  })
}

