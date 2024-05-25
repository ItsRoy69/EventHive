const router = require('express').Router()
const floorController = require('../controllers/floorController')

router.get('/', floorController.getFloors)
router.post('/', floorController.createFloor)
router.put('/', floorController.updateFloor)
router.delete('/', floorController.deleteFloor)

module.exports = router