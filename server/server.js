const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3500
require('dotenv').config()

app.use(cors())
app.use(express.json())

const connectToDB = require('./config/dbConfig')

const imageUploadRouter = require('./routes/imageUploadRouter')

app.use('/upload', imageUploadRouter)



connectToDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})