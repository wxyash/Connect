#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('backend:server');
var http = require('http');
const { ConnectionHistory } = require('../models/history')
const { VerifyUser } = require('../middleware/auth')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log(`listning to port ${port}`)
});
server.on('error', onError);
server.on('listening', onListening);
const io = require('socket.io')(server)
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
  console.log(socket.handshake.query)
  socket.emit('welcome', user)
  return next()

})
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = {
  io
}
