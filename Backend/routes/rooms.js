const express = require('express');
const router = express.Router();
const room = require('../controllers/room')
router.post('/create', room.createChatRoom)
router.get('/find', room.findAll)
router.post('/editRoom', room.editRoom);
module.exports = router;