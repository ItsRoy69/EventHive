const PersonalChat = require('../models/personalChatModel')

const getAllPersonalChats = async (req, res) => {
    try {
        const { eventId, userId } = req.body
        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const conditions = [ { senderId: userId }, { receiverId: userId } ]
        const personalChats = await PersonalChat.find({ eventId, $or: conditions })
        return res.status(200).json({ message: 'Chats fetched successfully', data: personalChats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getPersonalChatWithUser = async (req, res) => {
    try {
        const { eventId, userId, userId2 } = req.body

        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const conditions = [ { senderId: userId, receiverId: userId2 }, { senderId: userId2, receiverId: userId } ]
        const personalChats = await PersonalChat.find({ $or: conditions }).sort({ timestamp: -1 })   
        return res.staus(200).json({ message: 'Chats fetched successfully', data: personalChats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createPersonalChat = async (req, res) => {
    try {
        const { eventId, userId: senderId, receiverId, type, message } = req.body
        const cdnLink = req.cdnLink
        const chatObj = { eventId, senderId, receiverId, type, message, image: type === "image" && cdnLink }
        const newChat = new PersonalChat.create(chatObj)
        return res.status(200).json({ message: 'Chat created successfully', data: newChat })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updatePersonalChat = async (req, res) => {
    try {
        const { chatId, message, userId } = req.body
        const existingChat = await PersonalChat.findById(chatId)
        if (!existingChat) {
            return res.status(404).json({ message: 'Chat not found' })
        }
        if (existingChat.receiverId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' })
        }
        existingChat.message = message
        const updatedChat = await existingChat.save()
        return res.status(200).json({ message: 'Chat updated successfully', data: updatedChat })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deletePersonalChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body
        const existingChat = await PersonalChat.findById(chatId)
        if (!existingChat) {
            return res.status(404).json({ message: 'Chat not found' })
        }
        if (existingChat.receiverId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' })
        }
        await existingChat.remove()
        return res.status(200).json({ message: 'Chat deleted successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getAllPersonalChats,
    getPersonalChatWithUser,
    createPersonalChat,
    updatePersonalChat,
    deletePersonalChat
}