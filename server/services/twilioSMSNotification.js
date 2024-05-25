import twilio from 'twilio'

const sendSMS = async (to, event, host, inviteLink) => {
    try {
        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

        const response = await client.messages.create({
            body: `Hey, you have invited by ${host} to ${event.name}. Click on this link to accept the inivitation - ${inviteLink}`,
            to,
            from: process.env.TWILIO_PHONE_NUMBER
        })
        return response
    } catch (error) {
        console.log(error)
        return new Error(error)
    }
}

module.exports = sendSMS