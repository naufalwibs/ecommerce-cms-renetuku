const { User, Product, Wishlist } = require('../models')

class WishlistController {
    static showAllWishlist (req, res, next) {
        let { id, email, role } = req.currentUser
        Wishlist.findAll({
            where: {UserId: id},
            order: [
                ['createdAt', 'DESC']
            ],
            include: {
                model: Product
            }
        })
        .then(wishlists => {
            res.status(200).json(wishlists)
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'wishlistController.showAllWishlist' })
        })
    }

    static addToWishlist (req, res, next) {
        let { id, email, role } = req.currentUser
        let ProductId = req.body.ProductId
        
        Wishlist.findOne({
            where: { ProductId, UserId: id }
        })
        .then(wishlist => {
            if (wishlist) {
                res.status(400).json({ message: 'Product already on your wishlist' })
            } else {
                return Wishlist.create({ UserId: id, ProductId })
            }
        })
        .then(wishlist => {
            res.status(201).json(wishlist)
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'wishlistController.addToWishlist' })
        })
    }

    static removeFromWishlist (req, res, next) {
        let { id } = req.params
      
        Wishlist.destroy({
            where: { id }
        })
        .then(() => {
            res.status(200).json({ message: 'Product succesfully removed from wishlist' })
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'wishlistController.removeFromWishlist' })
        })
    }
}

module.exports = WishlistController