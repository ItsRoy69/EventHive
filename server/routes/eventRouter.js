const router = require('express').Router()
const eventController = require('../controllers/eventController')
const {verifyToken} = require('../middlewares/auth')
const {getUserRoleInEvent} = require('../middlewares/role')

router.get('/', verifyToken, getUserRoleInEvent, eventController.getEvents)
router.post('/', eventController.createEvent)
router.put('/', verifyToken, getUserRoleInEvent, eventController.updateEvent)
router.delete('/', verifyToken, getUserRoleInEvent, eventController.deleteEvent)

module.exports = router