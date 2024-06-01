const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3500
require('dotenv').config()

app.use(cors());
app.use(express.json())

const connectToDB = require('./config/dbConfig')

const eventRouter = require('./routes/eventRouter')
const floorRouter = require('./routes/floorRouter.js')
const groupChannelRouter = require('./routes/groupChannelRouter.js')
const groupChatRouter = require('./routes/groupChatRouter.js')
const guestRouter = require('./routes/guestRouter.js')
const hostRouter = require('./routes/hostRouter.js')
const imageChannelRouter = require('./routes/imageChannelRouter.js')
const imageRouter = require('./routes/imageRouter.js')
const imageUploadRouter = require('./routes/imageUploadRouter.js')
const meetingRouter = require('./routes/meetingRouter.js')
const notificationRouter = require('./routes/notificationRouter.js')
const paymentRouter = require('./routes/paymentRouter.js')
const rsvpRouter = require('./routes/rsvpRouter.js')
const subEventRouter = require('./routes/subEventRouter.js')
const userRouter = require('./routes/userRouter.js')
const vendorRouter = require('./routes/vendorRouter.js')
const venueRouter = require('./routes/venueRouter.js')
const inviteRouter = require('./routes/inviteRouter.js');

app.use('/event', eventRouter)
app.use('/floor', floorRouter)
app.use('/group-channel', groupChannelRouter)
app.use('/group-chat', groupChatRouter)
app.use('/guest', guestRouter)
app.use('/host', hostRouter)
app.use('/image-channel', imageChannelRouter)
app.use('/image', imageRouter)
app.use('/image-upload', imageUploadRouter)
app.use('/meeting', meetingRouter)
app.use('/notification', notificationRouter)
app.use('/payment', paymentRouter)
app.use('/rsvp', rsvpRouter)
app.use('/sub-event', subEventRouter)
app.use('/user', userRouter)
app.use('/vendor', vendorRouter)
app.use('/venue', venueRouter)
app.use('/invite', inviteRouter);

connectToDB()

const firebaseConfig = require('./config/firebaseConfig')

app.post('/send-notification', async (req, res) => {
    const { token, title, body } = req.body;
  
    const message = {
        notification: {
            title,
            body,
        },
        token,
    };
  
    try {
      const responseNoti = await firebaseConfig.messaging().send(message);
      res.status(200).send('Notification sent successfully', responseNoti);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending notification');
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})