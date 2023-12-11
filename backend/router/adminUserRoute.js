const router = require('express').Router()
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser

} = require('../controller/adminUserController')
const {registerUser} = require('../controller/userController')


router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', registerUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)


module.exports = router