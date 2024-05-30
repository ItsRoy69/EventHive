const mongoose = require('mongoose')

const personalChatSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        default: ''
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

module.exports = mongoose.model('PersonalChat', personalChatSchema)