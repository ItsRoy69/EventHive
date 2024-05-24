const router = require('express').Router()
const paymentController = require('../controllers/paymentController')

router.get('/', paymentController.getPayments)
router.post('/', paymentController.createPayment)
router.put('/', paymentController.updatePayment)
router.delete('/', paymentController.deletePayment)

module.exports = router