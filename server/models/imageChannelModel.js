const mongoose = require('mongoose')

const imageChannelSchema = new mongoose.Schema({
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
        ref: ['Host', 'Guest'],
        required: true
    }]
})

module.exports = mongoose.model('ImageChannel', imageChannelSchema)