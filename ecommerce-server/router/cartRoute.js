const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const { authenticate, authorizeCart } = require('../middlewares/auth')

router.get('/carts', authenticate, CartController.showAllCart)
router.post('/carts/:ProductId', authenticate, CartController.addToCart)
router.patch('/carts/:ProductId', authenticate, authorizeCart, CartController.updateCartItemQty)
router.delete('/carts/:id', authenticate, authorizeCart, CartController.deleteFromCart)

module.exports = router