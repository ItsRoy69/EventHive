const router = require('express').Router()
const { uploadImageMiddleware, handleUploadResponse } = require('../config/multerConfig')
const personalChatController = require('../controllers/personalChatController')

router.post('/all', verifyUser, personalChatController.getAllPersonalChats)
router.post('/withUser', verifyUser, personalChatController.getPersonalChatWithUser)
router.post('/', verifyUser, uploadImageMiddleware, handleUploadResponse, personalChatController.createPersonalChat)
router.put('/', verifyUser, personalChatController.updatePersonalChat)
router.delete('/', verifyUser, personalChatController.deletePersonalChat)

module.exports = router