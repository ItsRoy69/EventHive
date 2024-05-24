const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true
    },
    subject: {
        type: String
    },
    datetime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'due'
    }
})

module.exports = mongoose.model('Payment', paymentSchema)