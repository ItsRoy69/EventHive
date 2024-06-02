const Meeting = require('../models/meetingModel')
const mongoose = require('mongoose')

const getMeetings = async (req, res) => {
    try {
        const { role } = req.body
        const { eventId } = req.params
        if (role === 'host') {
            const meetings = await Meeting.aggregate([
                {
                    $match: {
                        eventId: new mongoose.Types.ObjectId(eventId),
                        datetime: { $gt: new Date() }
                    }
                }
            ])
            // const meetings = await Meeting.find({ eventId: eventId })
            return res.status(200).json({ message: "Meetings fetched successfully", data: meetings })
        } else if (role === 'vendor') {
            const meetings = await Meeting.aggregate([
                {
                    $match: {
                        eventId: new mongoose.Types.ObjectId(eventId),
                        datetime: { $gt: new Date() },
                        vendorId: new mongoose.Types.ObjectId(req.body.vendorId)
                    }
                }
            ])
            return res.status(200).json({ message: "Meetings fetched successfully", data: meetings })
        } 
        return res.status(400).json({ message: 'You are not authorized to perform this action' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createMeeting = async (req, res) => {
    try {
        const { meeting, eventId, role } = req.body
        if (role !== 'host') {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const newMeeting = new Meeting({
            eventId,
            vendorId: meeting.vendorId,
            subject: meeting.subject,
            datetime: meeting.datetime,
            location: meeting.location
        })
        await newMeeting.save()
        return res.status(200).json({ message: 'Meeting created successfully', data: newMeeting })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateMeeting = async (req, res) => {
    try {
        const { role, meetingId, vendorId, subject, datetime } = req.body
        if (role !== 'host') {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const existingMeeting = await Meeting.findById(meetingId)
        if (!existingMeeting) {
            return res.status(400).json({ message: 'Meeting not found' })
        }
        if (vendorId) {
            existingMeeting.vendorId = vendorId 
        }
        if (subject) {
            existingMeeting.subject = subject
        }
        if (datetime) {
            existingMeeting.datetime = datetime
        }
        await existingMeeting.save()
        return res.status(200).json({ message: 'Meeting updated successfully', data: existingMeeting })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteMeeting = async (req, res) => {
    try {
        const { role, meetingId } = req.body
        if (role !== 'host') {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const existingMeeting = await Meeting.findById(meetingId)
        if (!existingMeeting) {
            return res.status(400).json({ message: 'Meeting not found' })
        }
        await existingMeeting.remove()
        return res.status(200).json({ message: 'Meeting deleted successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getMeetings,
    createMeeting,
    updateMeeting,
    deleteMeeting
}