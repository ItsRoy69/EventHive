const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');
const { getUserRoleInEvent } = require('../middlewares/role');

router.post('/', getUserRoleInEvent, inviteController.createInviteLink);
router.get('/:eventId/:inviteId', inviteController.handleInviteLink);

module.exports = router;