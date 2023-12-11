const express = require('express');
const upload = require('../middlewares/multerConfig')

//controllers  
const userAuthController = require('../controller/userController')

const router = express.Router()

router.post('/login', userAuthController.userLogin)
router.post('/register-user', userAuthController.registerUser)
router.post('/update-profile/:id',upload.single('profile'),userAuthController.updateProfile)

module.exports = router