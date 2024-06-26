const Guest = require('../models/guestModel')
const Host = require('../models/hostModel')
const Event = require('../models/eventModel')
const SubEvent = require('../models/subEventModel')
const Vendor = require('../models/vendorModel')
const RSVP = require('../models/rsvpModel')

const getUserRoleInEvent = async(req, res, next) => {
    let { userId, eventId } = req.body
    if (!eventId) {
        eventId = req.params.eventId || req.params.id
        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
    }
    const event = await Event.findById(eventId).lean().exec()
    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }
    const host = await Host.findOne({ userId, eventId })
    const guest = await Guest.findOne({ userId, eventId })
    const vendor = await Vendor.findOne({ userId, eventId })
    if (host) {
        req.body.role = 'host'
        req.body.event = event
        req.body.hostId = host._id
        next()
    } else if (guest) {
        req.body.role = 'guest'
        req.body.event = event
        req.body.guestId = guest._id
        next()
    } else if (vendor) {
        req.body.role = 'vendor'
        req.body.event = event
        req.body.vendorId = vendor._id
        next()
    } else {
        return res.status(400).json({ message: 'You are not authorized to perform this action' })
    }
}

const getUserRoleInSubEvent = async (req, res, next) => {
    const { userId } = req.body
    const { subEventId } = req.params
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
        req.bost.hostId = host._id
        next()
    } else if (guest && rsvpd?.length > 0) {
        req.body.role = 'guest'
        req.body.guestId = guest._id
        req.body.subEventData = rsvpd[0].subEventDetails
        next()
    } else if (vendor) {
        req.body.role = 'vendor'
        req.body.vendorId = vendor._id
        next()
    } else {
        return res.status(400).json({ message: 'You are not authorized to perform this action' })
    }
}

module.exports = {
    getUserRoleInEvent,
    getUserRoleInSubEvent
}