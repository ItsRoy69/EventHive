const router = require('express').Router()
const meetingController = require('../controllers/meetingController')
const { verifyToken } = require('../middlewares/auth')
const { getUserRoleInEvent } = require('../middlewares/role')

router.get('/', verifyToken, getUserRoleInEvent, meetingController.getMeetings)
router.post('/', verifyToken, getUserRoleInEvent, meetingController.createMeeting)
router.put('/', verifyToken, getUserRoleInEvent, meetingController.updateMeeting)
router.delete('/', verifyToken, getUserRoleInEvent, meetingController.deleteMeeting) 

module.exports = router