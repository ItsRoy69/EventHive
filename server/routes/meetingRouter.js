const router = require('express').Router()
const meetingController = require('../controllers/meetingController')

router.get('/', meetingController.getMeetings)
router.post('/', meetingController.createMeeting)
router.put('/', meetingController.updateMeeting)
router.delete('/', meetingController.deleteMeeting) 

module.exports = router