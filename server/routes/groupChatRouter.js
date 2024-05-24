const router = require('express').Router()
const groupChatController = require('../controllers/groupChatController')

router.get('/', groupChatController.getGroupChats)
router.post('/', groupChatController.createGroupChat)
router.put('/', groupChatController.updateGroupChat)
router.delete('/', groupChatController.deleteGroupChat)

module.exports = router