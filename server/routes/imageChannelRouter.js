const router = require('express').Router()
const imageChannelController = require('../controllers/imageChannelController')

router.get('/', imageChannelController.getImageChannels)
router.post('/', imageChannelController.createImageChannel)
router.put('/', imageChannelController.updateImageChannel)
router.delete('/', imageChannelController.deleteImageChannel)

module.exports = router