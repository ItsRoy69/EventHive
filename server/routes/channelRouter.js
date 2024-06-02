const router = require('express').Router()
const channelController = require('../controllers/channelController')
const { verifyToken } = require('../middlewares/auth')
const { getUserRoleInEvent } = require('../middlewares/role')

router.get('/:eventId', verifyToken, getUserRoleInEvent, channelController.getChannelsForSubEvent)
router.post('/', channelController.createChannel)
router.put('/', channelController.updateChannel)
router.delete('/', channelController.deleteChannel)

module.exports = router