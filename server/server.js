const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3500
require('dotenv').config()

app.use(cors())

const connectToDB = require('./config/dbConfig')

const upload = require('./utils/multerConfig')
const { uploadImageMiddleware, handleUploadResponse } = require('./utils/multerConfig')

app.use(express.json())
app.post('/upload', uploadImageMiddleware, handleUploadResponse, async (req, res) => {
    try {
      
        const uploadedImageUrl = req.cdnLink
        console.log('Image uploaded successfully:', uploadedImageUrl)
        res.status(200).json({ message: 'Image uploaded and processed successfully!', data: { cdnLink: uploadedImageUrl } })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
});

connectToDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})