const router = require('express').Router()
const groupController = require('../controllers/groupChannelController')

router.get('/', groupController.getGroupChannels)
router.post('/', groupController.createGroupChannel)
router.put('/', groupController.updateGroupChannel)
router.delete('/', groupController.deleteGroupChannel)

module.exports = router