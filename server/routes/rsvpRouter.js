const router = require('express').Router()
const rsvpController = require('../controllers/rsvpController')

router.get('/', rsvpController.getRSVPs)
router.post('/', rsvpController.createRSVP)
router.put('/', rsvpController.updateRSVP)
router.delete('/', rsvpController.deleteRSVP)

module.exports = router