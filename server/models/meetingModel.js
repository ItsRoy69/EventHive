const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Meeting', meetingSchema)