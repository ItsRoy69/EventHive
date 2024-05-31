const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  inviteLink: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host',
    required: true,
  },
});

module.exports = mongoose.model('Invite', inviteSchema);