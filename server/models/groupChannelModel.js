const mongoose = require('mongoose')

const groupChannelSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: ['Host', 'Guest', 'Vendor'],
        required: true
    }],
    avatar: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('GroupChannel', groupChannelSchema)