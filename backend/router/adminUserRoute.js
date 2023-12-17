const router = require('express').Router()
const {isAdminLogedIn} = require('../middlewares/authMiddleware')
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser

} = require('../controller/adminUserController')
const {registerUser} = require('../controller/userController')


router.get('/',isAdminLogedIn, getAllUsers)
router.get('/:id', getUser)
router.post('/', registerUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)


module.exports = router