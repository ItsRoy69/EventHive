const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');
const { getUserRoleInEvent } = require('../middlewares/role');
const { verifyToken } = require('../middlewares/auth');

router.post('/', verifyToken, getUserRoleInEvent, inviteController.createInviteLink);
router.get('/:eventId/:inviteId', inviteController.handleInviteLink);

module.exports = router;