const Guest = require('../models/guestModel')
const Host = require('../models/hostModel')
const Event = require('../models/eventModel')
const SubEvent = require('../models/subEventModel')
const Vendor = require('../models/vendorModel')
const RSVP = require('../models/rsvpModel')

const getUserRoleInEvent = async(req, res, next) => {
    const { userId, eventId } = req.body
    const host = await Host.findOne({ userId, eventId })
    const guest = await Guest.findOne({ userId, eventId })
    const vendor = await Vendor.findOne({ userId, eventId })
    if (host) {
        req.body.role = 'host'
        next()
    } else if (guest) {
        req.body.role = 'guest'
        next()
    } else if (vendor) {
        req.body.role = 'vendor'
        next()
    } 
    return res.status(400).json({ message: 'You are not authorized to perform this action' })
}

const getUserRoleInSubEvent = async(req, res, next) => {
    const { userId, subEventId } = req.body
    const subEvent = await SubEvent.findOne({ subEventId })
    const event = await Event.findById(subEvent.eventId)
    const host = await Host.findOne({ userId, eventId: event._id })
    const guest = await Guest.findOne({ userId, eventId: event._id })
    const vendor = await Vendor.findOne({ userId, eventId: event._id })
    const rsvpd = await RSVP.aggregate([
        // Match the RSVP documents with the given guestId
        {
            $match: {
                guestId: mongoose.Types.ObjectId(guest._id)
            }
        },
        // Unwind the tags array to work with individual tag objects
        {
            $unwind: '$tags'
        },
        // Match the tags with the given subEventId and status 'accepted'
        {
            $match: {
                'tags.subEventId': mongoose.Types.ObjectId(subEventId),
                'tags.status': 'accepted'
            }
        },
        // Optionally, if you need to include related SubEvent details, add a lookup stage
        {
            $lookup: {
                from: 'subevents',
                localField: 'tags.subEventId',
                foreignField: '_id',
                as: 'subEventDetails'
            }
        },
        // Project the required fields
        {
            $project: {
                _id: 0,
                subEventDetails: { $arrayElemAt: ['$subEventDetails', 0] },
                status: '$tags.status'
            }
        }
    ]);

    if (host) {
        req.body.role = 'host'
        next()
    } else if (guest && rsvpd?.length > 0) {
        req.body.role = 'guest'
        req.body.subEventData = rsvpd[0].subEventDetails
        next()
    } else if (vendor) {
        req.body.role = 'vendor'
        next()
    } 
    return res.status(400).json({ message: 'You are not authorized to perform this action' })
}

module.exports = { 
    getUserRoleInEvent, 
    getUserRoleInSubEvent 
}