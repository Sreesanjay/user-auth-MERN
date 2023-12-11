const router = require('express').Router()
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser

} = require('../controller/adminUserController')


router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', )
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)


module.exports = router