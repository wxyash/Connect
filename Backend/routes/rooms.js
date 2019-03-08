const express = require('express');
const router = express.Router();
const room = require('../controllers/room')
router.post('/create', room.createChatRoom)
router.post('/find', room.findAll)
module.exports = router;