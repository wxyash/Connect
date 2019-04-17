const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

/* GET car listing. */
// router.get('/find', car.findCarByCarId);
// router.get('/find/All',car.findAll);
// router.get('/find/user', car.findCarByUserId);
// router.post('/register', car.createCar);
// router.patch('/update', car.updateCar)
// router.delete('/delete',car.deleteCar);
router.post('/register', user.Register);
router.post('/find', user.findByEmail);
router.post('/findById', user.findById);
module.exports = router;