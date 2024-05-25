const router = require('express').Router()
const subEventController = require('../controllers/subEventController')

router.get('/', subEventController.getSubEvents)
router.post('/', subEventController.createSubEvent)
router.put('/', subEventController.updateSubEvent)
router.delete('/', subEventController.deleteSubEvent)

module.exports = router