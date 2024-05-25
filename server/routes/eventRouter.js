const router = require('express').Router()
const eventController = require('../controllers/eventController')
const {verifyToken} = require('../middlewares/auth')

router.get('/', verifyToken, eventController.getEvents)
router.post('/', verifyToken, eventController.createEvent)
router.put('/', verifyToken, eventController.updateEvent)
router.delete('/', verifyToken, eventController.deleteEvent)

module.exports = router