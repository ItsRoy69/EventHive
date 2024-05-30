const GroupChannel = require('../models/groupChannelModel')

const getGroupChannels = async (req, res) => {
    try {
        const { eventId, userId } = req.body
        const groupChannels = await GroupChannel.find({ eventId, members: { $in: [userId] } })
        return res.status(200).json({ message: 'Group channels fetched successfully', data: groupChannels })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const createGroupChannel = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const updateGroupChannel = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const deleteGroupChannel = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = {
    getGroupChannels,
    createGroupChannel,
    updateGroupChannel,
    deleteGroupChannel
}