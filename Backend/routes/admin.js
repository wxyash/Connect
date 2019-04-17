const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin')


router.post('/login', admin.Login)
router.post('/register', admin.Register)
router.get('/verify', admin.verifyToken);
router.post('/findAll', admin.findAll);
module.exports = router;