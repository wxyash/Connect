const express = require('express');
const router = express.Router();
const history = require('../controllers/history');

router.post('/chat-history', history.eventfindAll);
router.get('/chat-history', history.chatHistory)

module.exports = router