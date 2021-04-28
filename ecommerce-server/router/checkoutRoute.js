const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/checkoutController')
const { authenticate } = require('../middlewares/auth')

router.get('/checkout', authenticate, CheckoutController.showAllHistory)
router.post('/checkout', authenticate, CheckoutController.checkout)

module.exports = router