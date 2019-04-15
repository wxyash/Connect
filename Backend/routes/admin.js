const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin')


router.post('/login', admin.Login)
router.post('/register', admin.Register)
// router.post('/find', admin.findByEmail)
module.exports = router;