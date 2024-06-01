const mongoose = require('mongoose')

const imageChannelSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    subEventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubEvent',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'User'
        // ref: ['Host', 'Guest', 'Vendor'],
        // required: true
    }],
    avatar: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'unrestricted'
    }
})

module.exports = mongoose.model('ImageChannel', imageChannelSchema)