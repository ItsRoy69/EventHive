const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    imageChannelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ImageChannel',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    estimatedReceiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

module.exports = mongoose.model('Image', imageSchema)