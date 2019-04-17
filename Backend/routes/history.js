const express = require('express');
const router = express.Router();
const history = require('../controllers/history');

router.post('/chat-history', history.eventfindAll);

module.exports = router