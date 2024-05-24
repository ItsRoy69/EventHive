const router = require('express').Router()
const { uploadImageMiddleware, handleUploadResponse } = require('../utils/multerConfig')
const imageUploader = require('../controllers/imageUploadController')

router.post('/', uploadImageMiddleware, handleUploadResponse, imageUploader)

module.exports = router