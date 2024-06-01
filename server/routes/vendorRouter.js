const router = require('express').Router()
const vendorController = require('../controllers/vendorController')
const { verifyToken } = require('../middlewares/auth')
const { getUserRoleInEvent } = require('../middlewares/role')

router.get('/:eventId', verifyToken, getUserRoleInEvent, vendorController.getVendorsInEvent)
router.post('/', vendorController.createVendor)
router.put('/', vendorController.updateVendor)
router.delete('/', vendorController.deleteVendor)

module.exports = router