const router = require('express').Router()
const guestController = require('../controllers/guestController')

router.get('/', guestController.getGuests)
router.post('/', guestController.createGuest)
router.post('/sendInvitation',guestController.sendInvitation)
router.put('/', guestController.updateGuest)
router.delete('/', guestController.deleteGuest)

module.exports = router