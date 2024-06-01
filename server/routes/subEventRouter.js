const router = require('express').Router()
const { verifyToken } = require('../middlewares/auth')
const { getUserRoleInSubEvent, getUserRoleInEvent } = require('../middlewares/role')
const subEventController = require('../controllers/subEventController')

router.get('/:eventId', verifyToken, subEventController.getSubEvents)
router.post('/', verifyToken, getUserRoleInEvent, subEventController.createSubEvent)
router.put('/', verifyToken, getUserRoleInSubEvent, subEventController.updateSubEvent)
router.delete('/', verifyToken, getUserRoleInSubEvent, subEventController.deleteSubEvent)

module.exports = router