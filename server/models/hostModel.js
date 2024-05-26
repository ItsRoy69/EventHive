const mongoose = require('mongoose')

const hostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    // role: {
    //     type: String,
    //     required: true
    // }
})

module.exports = mongoose.model('Host', hostSchema)