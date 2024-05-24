const router = require('express').Router()
const vendorController = require('../controllers/vendorController')

router.get('/', vendorController.getVendors)
router.post('/', vendorController.createVendor)
router.put('/', vendorController.updateVendor)
router.delete('/', vendorController.deleteVendor)

module.exports = router