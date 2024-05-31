const { v4: uuidv4 } = require('uuid');

const generateInviteLink = (eventId, inviteId) => {
  const baseURL = process.env.APP_BASE_URL;
  const inviteLink = `${baseURL}/invite/${eventId}/${inviteId}`;
  return inviteLink;
};

module.exports = generateInviteLink;