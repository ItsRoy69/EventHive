const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/login', userController.loginUser)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router