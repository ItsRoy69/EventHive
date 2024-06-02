const GroupChannel = require('../models/groupChannelModel')
const SubEvent = require('../models/subEventModel')

const getSubEvents = async (req, res) => {
    try {
        const { role } = req.body
        const { eventId } = req.params
        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const subEventData = await SubEvent.find({ eventId: eventId })
        if (role === 'host' || role === 'vendor') {
            return res.status(200).json({ message:  "Sub-events fetched successfully", data: subEventData })
        }
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createSubEvent = async (req, res) => {
    try {
        const { eventId, subEvent, userId, role, autoCreateChannels } = req.body
        if (!subEvent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        if (role !== 'host') {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const newSubEvent = await SubEvent.create({
            eventId: eventId,
            name: subEvent.name,
            datetime: subEvent.datetime,
            venue: subEvent.venue,
            vendors: subEvent.vendors
        })
        if (autoCreateChannels) {
            await GroupChannel.create({
                eventId,
                subEventId: newSubEvent._id,
                name: 'Anouncements',
                type: 'restricted',
                members: [userId]
            })
            await GroupChannel.create({
                eventId,
                subEventId: newSubEvent._id,
                name: 'Group Chat',
                type: 'unrestricted',
                members: [userId]
            })
            await ImageChannel.create({
                eventId,
                subEventId: newSubEvent._id,
                name: 'Gallery',
                type: 'restricted',
                members: [userId]
            })
        }
        return res.status(200).json({ message: "Sub-event created succesfully", data: newSubEvent })
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateSubEvent = async (req, res) => {
    try {
        const { role,  venue, datetime, subEventId } = req.body
        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        if (role === 'host') {
            let subEvent = await SubEvent.findById(subEventId)
            if (!subEvent) {
                return res.status(400).json({ message: 'Sub-event not found' })
            }
            if (venue) {
                subEvent.venue = venue
            }
            if (datetime) {
                subEvent.datetime = datetime
            }
            subEvent = await subEvent.save()
            return res.status(200).json({ message: 'Sub-event updated successfully', data: subEvent })
        } else {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteSubEvent = async (req, res) => {
    try {
        const { userId, subEventId } = req.body
        if (!userId || !subEventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

    } catch (error) { 
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getSubEvents,
    createSubEvent,
    updateSubEvent,
    deleteSubEvent
}