const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
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
    serviceType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Vendor', vendorSchema)