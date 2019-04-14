const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin')


router.post('/login', admin.Login)
router.post('/register', admin.Register)
router.post('/findByEmail', admin.findByEmail)
module.exports = router;