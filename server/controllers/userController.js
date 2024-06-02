const User = require('../models/userModel')
const getJWTToken = require('../utils/getJWTToken')
const bcrypt = require('bcrypt')

const loginUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body
        if ((!email && !phone) || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        let existingUser = null
        if (email) {
            existingUser = await User.findOne({ email })
        } else {
            existingUser = await User.findOne({ phone })
        }
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (isMatch) {
                const token = getJWTToken('10d', {userId: existingUser._id}, {name: existingUser.name}, {phone: existingUser.phone})
                return res.status(200).json({ message: 'Login successful', data: { user: existingUser, token } })
            } else {
                return res.status(400).json({ message: "Password didn't match" })
            }
        } else {
            return res.status(400).json({ message: 'Account not found' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        if (!name || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (email) {
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: 'Account already exists for this email.' })
            }
        } else {
            const user = await User.findOne({ phone })
            if (user) {
                return res.status(400).json({ message: 'Account already exists for this phone number.' })
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ 
            name, 
            phone, 
            email: email ? email : null, 
            password: hashedPassword 
        })
        if (user) {
            let userData = { userId: user._id, name: user.name, phone: user.phone }
            const token = getJWTToken('1d', userData)
            userData.token = token
            return res.status(201).json({ message: 'User created successfully', data: userData })
        } else {
            throw new Error('User could not be created')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = {
    loginUser,
    createUser,
    updateUser,
    deleteUser
}