const uuid = require('react-native-uuid');

function generateInviteLink(eventId, eventHostId) {
  const uniqueId = uuid.v4();
  const inviteLink = `http://localhost:8081/invite/${eventId}/${eventHostId}/${uniqueId}`;
  return inviteLink;
}

module.exports = generateInviteLink;