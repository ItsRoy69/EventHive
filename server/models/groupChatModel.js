const mongoose = require('mongoose')

const groupChatSchema = new mongoose.Schema({
    groupChannelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupChannel',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ['Host', 'Guest', 'Vendor'],
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    message: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('GroupChat', groupChatSchema)