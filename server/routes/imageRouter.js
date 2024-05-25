const router = require('express').Router()
const imageController = require('../controllers/imageController')

router.get('/', imageController.getImages)
router.post('/', imageController.createImage)
router.put('/', imageController.updateImage)
router.delete('/', imageController.deleteImage) 

module.exports = router