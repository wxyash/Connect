const { io } = require('../bin/www')
const { ChatRoom } = require('../models/room')
const _ = require('lodash')
const { badRequest, success } = require('../utils/responseHandler')

module.exports.createChatRoom = async function (req, res) {
  let errors = {};
  let reqFields = ['user_id'];
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    };
  });

  let data = _.pick(req.body, ['user_id', 'name', 'password'])

  if (Object.keys(errors).length > 1) {
    return badRequest('Error creating a room', errors, res)
  }

  let room
  try {
    room = await new ChatRoom(data)
    if (!room) { return badRequest('Error creating a room', error.message, res) }
  } catch (error) {
    return badRequest('Error creating a room', error.message, res)
  }
  let savedRoom
  try {
    savedRoom = await room.save()
    if (!room) { return badRequest('Error creating a room', error.message, res) }
  } catch (error) {
    return badRequest('Error creating a room', error.message, res)
  }
  return success('Room has been created', savedRoom, res)
}

module.exports.findAll = async function (req, res) {
  let rooms = await ChatRoom.find({})
  success('Rooms', rooms, res)
}

module.exports.editRoom = async function (req, res) {
  let errors = {};
  let reqFields = ['room_id'];
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`;
    };
  });
  let data = _.pick(req.body, ['room_name', 'status'])
  let roomID = req.body.room_id
  let room
  try {
    room = await ChatRoom.findById(roomID)
    if (!room) { return badRequest('Error updated room a room', {} ,res) }
  } catch (error) {
    return badRequest('Error updated room a room', error.message ,res)
  }

  room.status = data.status
  room.name = data.room_name

  let savedRoom
  try {
    savedRoom = await room.save()
    if (!savedRoom) { return badRequest('Error saving updated room a room', {} ,res) }
  } catch (error) {
    return badRequest('Error saving updated room a room', error.message, res)
  }

  return success('Room has been updated Successfully', savedRoom, res)
}
