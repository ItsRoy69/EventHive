const router = require('express').Router()
const { uploadImageMiddleware, handleUploadResponse } = require('../config/multerConfig')
const personalChatController = require('../controllers/personalChatController')
const { verifyToken } = require('../middlewares/auth')

router.get('/all/:eventId', verifyToken, personalChatController.getAllPersonalChats)
router.post('/withUser/:eventId', verifyToken, personalChatController.getPersonalChatWithUser)
router.post('/:eventId', uploadImageMiddleware, handleUploadResponse, verifyToken, personalChatController.createPersonalChat)
router.put('/', verifyToken, personalChatController.updatePersonalChat)
router.delete('/', verifyToken, personalChatController.deletePersonalChat)

module.exports = router