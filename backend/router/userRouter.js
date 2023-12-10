const express = require('express');

//controllers  
const userAuthController = require('../controller/userAuthController')

const router = express.Router()

router.post('/login', userAuthController.userLogin)
router.post('/register-user', userAuthController.registerUser)
router.post('/update-profile')

module.exports = router