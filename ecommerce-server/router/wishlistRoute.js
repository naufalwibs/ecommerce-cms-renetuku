const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');
const { authenticate, authorizeWishlist } = require('../middlewares/auth');

router.get('/wishlists', authenticate, WishlistController.showAllWishlist)
router.post('/wishlists', authenticate, WishlistController.addToWishlist)
router.delete('/wishlists/:id', authenticate, authorizeWishlist, WishlistController.removeFromWishlist)


module.exports = router