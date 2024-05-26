const mongoose = require('mongoose')

const dateTimeSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
})

module.exports = dateTimeSchema