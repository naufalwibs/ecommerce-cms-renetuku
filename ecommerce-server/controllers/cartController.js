const { User, Product, Cart } = require('../models')

class CartController {
    static showAllCart (req, res, next) {

        let { id, email, role } = req.currentUser
        Cart.findAll({
            where: { UserId: id },
            order: [
                ['createdAt', 'ASC']
            ],
            include: {
                model: Product
            }
        })
        .then(carts => {
            res.status(200).json(carts)
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'CartController.js' })
        })

    }

    static addToCart (req, res, next) {
        let ProductId = req.params.ProductId;
        let { id, email, role } = req.currentUser;
        // let { quantity } = req.body

        // if (quantity) {
        //     Cart.findOne({ 
        //         where: { ProductId },
        //         include: {
        //             model: Product
        //         } 
        //     })
        //     .then(cart => {
        //         if (quantity <= cart.Product.stock) {
        //             return Cart.update({ quantity }, {
        //                 where: { id: cart.id }
        //             })
        //         } else {
        //             res.status(400).json({ message: "Stock not available" })
        //         }
        //     })
        //     .then(cart => {
        //         if (Array.isArray(cart)) {
        //             res.status(200).json({ message: 'Quantity succesfully Updated' })
        //         }
        //     })
        //     .catch(err => {
        //         next({ code: 500, message: err.message, from: 'CartController.js' })
        //     })
        // } else {
            Cart.findOne({ 
                where: { ProductId },
                include: {
                    model: Product
                } 
            })
            .then(cart => {
                if (cart) {
                    if (cart.quantity < cart.Product.stock) {
                        let newQuantity = ++cart.quantity
                        return Cart.update({ quantity: newQuantity }, {
                            where: { id: cart.id }
                        })
                    } else {
                        res.status(400).json({ message: "Stock not available" })
                    }
                } else {
                    return Cart.create({ UserId: id, ProductId })
                }
            })
            .then(cart => {
                if (Array.isArray(cart)) {
                    res.status(200).json({ message: 'Already on Cart, Quantity Updated' })
                } else if (typeof cart === 'object') {
                    res.status(201).json({ cart, message: 'Successfully Add to Cart' })
                }
            })
            .catch(err => {
                next({ code: 500, message: err.message, from: 'CartController.js' })
            })
        // }
    }

    static updateCartItemQty (req, res, next) {
        let ProductId = req.params.ProductId
        let quantity = req.body.quantity

        Cart.findOne({ 
            where: { ProductId },
            include: {
                model: Product
            } 
        })
        .then(cart => {
            if (quantity <= cart.Product.stock) {
                return Cart.update({ quantity }, {
                    where: { id: cart.id }
                })
            } else {
                res.status(400).json({ message: "Stock not available" })
            }
        })
        .then(cart => {
            if (Array.isArray(cart)) {
                res.status(200).json({ message: 'Quantity succesfully Updated' })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteFromCart (req, res, next) {
        Cart.destroy({ 
            where: { id: req.params.id } 
        })
        .then(() => {
            res.status(200).json({ message: 'Product succesfully removed from cart' })
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'CartController.js' })
        })
    }

}

module.exports = CartController