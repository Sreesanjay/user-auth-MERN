const express = require('express');
const router = express.Router()
const userManagementRoute = require('./adminUserRoute')

const adminController = require('../controller/adminController')

router.post('/login' ,adminController.login )

router.use('/user-management',userManagementRoute)

module.exports = router