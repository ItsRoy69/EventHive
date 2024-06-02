const mongoose = require('mongoose')

const imageChannelSchema = new mongoose.Schema({
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
        ref: 'User'
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    avatar: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'restricted'
    }
})

module.exports = mongoose.model('ImageChannel', imageChannelSchema)