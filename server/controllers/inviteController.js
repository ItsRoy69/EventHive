const Event = require('../models/eventModel');
const Invite = require('../models/inviteModel');
const generateInviteLink = require('../utils/inviteLinkGenerator');
const { v4: uuidv4 } = require('uuid'); 

const createInviteLink = async (req, res) => {
    try {
        const { eventId, role, hostId, guestId, vendorId } = req.body;

        if (role !== 'host') {
            return res.status(403).json({ message: 'Only hosts can create invite links' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const inviteId = uuidv4();
        const inviteLink = generateInviteLink(eventId, inviteId);

        const invite = new Invite({
            eventId,
            inviteLink,
            createdBy: hostId,
        });
        await invite.save();

        return res.status(201).json({ message: 'Invite link created successfully', data: invite });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const handleInviteLink = async (req, res) => {
  try {
    const { eventId, inviteId } = req.params;

    const invite = await Invite.findOne({ _id: inviteId, eventId }).populate('eventId');
    if (!invite) {
      return res.status(404).json({ message: 'Invalid invite link' });
    }

    const userAgent = req.headers['user-agent'];
    const hasApp = checkMobileAppInstalled(userAgent);

    if (hasApp) {
      const appURL = process.env.APP_URL;
        const appLink = `${appURL}//invite?eventId=${eventId}&inviteId=${inviteId}`;
        return res.redirect(appLink);
      } else {
        const baseURL = process.env.APP_BASE_URL;
        const webLink = `${baseURL}/events/${eventId}/join`;
        return res.redirect(webLink);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    createInviteLink,
    handleInviteLink
};