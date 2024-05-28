const router = require('express').Router()
const notificationController = require('../controllers/notificationController')
const { verifyToken } = require('../middlewares/auth')

router.get('/generate-token', verifyToken, notificationController.generateFCMToken)

module.exports = router