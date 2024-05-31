const router = require('express').Router()
const { uploadImageMiddleware, handleUploadResponse } = require('../config/multerConfig')
const groupChatController = require('../controllers/groupChatController')

router.get('/:id', groupChatController.getGroupChats)
router.post('/', uploadImageMiddleware, handleUploadResponse, groupChatController.createGroupChat)
router.put('/', groupChatController.updateGroupChat)
router.delete('/', groupChatController.deleteGroupChat)

module.exports = router