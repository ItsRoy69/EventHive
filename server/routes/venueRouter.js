const router = require('express').Router()
const venueController = require('../controllers/venueController')

router.get('/', venueController.getVenues)
router.post('/', venueController.createVenue)
router.put('/', venueController.updateVenue)
router.delete('/', venueController.deleteVenue) 

module.exports = router