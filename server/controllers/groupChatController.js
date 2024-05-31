const GroupChat = require('../models/groupChatModel')
const GroupChannel = require('../models/groupChannelModel')

const getGroupChats = async (req, res) => {
    try {
        const { id: channelId } = req.params
        if (!channelId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const groupChats = await GroupChat.find({ groupChannelId: channelId }).sort({ timestamp: -1 })
        return res.status(200).json({ message: 'Chats fetched successfully', data: groupChats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const createGroupChat = async (req, res) => {   
    try {
        const { userId: senderId, message, type } = req.body
        const cdnLink = req.cdnLink
        const chatObj = { senderId, message, type, image: type === "image" && cdnLink }
        const newChat = new GroupChat.create(chatObj)
        return res.status(200).json({ message: 'Chat created successfully', data: newChat })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateGroupChat = async (req, res) => {
    try {
        const { chatId } = req.body
        if (!chatId) { 
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const existingChat = await GroupChat.findById(chatId)
        if (!existingChat) {
            return res.status(404).json({ message: 'Chat not found' })
        }
        const { message } = req.body
        existingChat.message = message
        const updatedChat = await existingChat.save()
        return res.status(200).json({ message: 'Chat updated successfully', data: updatedChat })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteGroupChat = async (req, res) => {
    try {
        const { chatId } = req.body
        if (!chatId) { 
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const existingChat = await GroupChat.findById(chatId)
        if (!existingChat) {
            return res.status(404).json({ message: 'Chat not found' })
        }
        await existingChat.remove()
        return res.status(200).json({ message: 'Chat deleted successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getGroupChats,
    createGroupChat,
    updateGroupChat,
    deleteGroupChat
}