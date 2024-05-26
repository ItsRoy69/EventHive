const firebaseConfig = require('../config/firebaseConfig');

const generateFCMToken = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const messaging = firebaseConfig.messaging()
        const customToken = await messaging.getToken(userId);
        return res.status(200).json({ fcmToken: customToken });
    } catch (error) {
        console.error('Error creating custom token:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    generateFCMToken
}