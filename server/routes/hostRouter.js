const router = require('express').Router()
const hostController = require('../controllers/hostController')

router.get('/', hostController.getHosts)
router.post('/', hostController.createHost)
router.put('/', hostController.updateHost)
router.delete('/', hostController.deleteHost)

module.exports = router