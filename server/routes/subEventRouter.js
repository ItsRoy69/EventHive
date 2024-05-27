const router = require('express').Router()
const { verifyToken } = require('../middlewares/auth')
const { getUserRoleInSubEvent } = require('../middlewares/role')
const subEventController = require('../controllers/subEventController')

router.get('/', verifyToken, getUserRoleInSubEvent, subEventController.getSubEvents)
router.post('/', verifyToken, getUserRoleInSubEvent, subEventController.createSubEvent)
router.put('/', verifyToken, getUserRoleInSubEvent, subEventController.updateSubEvent)
router.delete('/', verifyToken, getUserRoleInSubEvent, subEventController.deleteSubEvent)

module.exports = router