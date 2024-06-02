const router = require('express').Router()
const { handleUploadResponse, uploadImageMiddleware } = require('../config/multerConfig')
const imageController = require('../controllers/imageController')
const { verifyToken } = require('../middlewares/auth')

router.get('/:imageChannelId', verifyToken, imageController.getImages)
router.post('/', verifyToken, uploadImageMiddleware, handleUploadResponse, imageController.createImage)
router.put('/', imageController.updateImage)
router.delete('/', imageController.deleteImage) 

module.exports = router