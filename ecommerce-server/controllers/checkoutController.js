const { User, Cart, Product, History } = require('../models')

class CheckoutController {
    static checkout (req, res, next) {
        let { id, email, role } = req.currentUser

        let transactionCode = `RNTK-ID${new Date().getFullYear()}${new Date().getMonth()+1}`;
        let purchaseDate = `${new Date().getDate()} - ${new Date().getMonth()+1} - ${new Date().getFullYear()}`;
        let totalItem = null;
        let totalPrice = 0;
        let productAndQty = [];
        let history;

        Cart.findAll({
            where: {UserId: id},
            include: {
                model: Product
            }
        })
        .then(carts => {
            totalItem = carts.length
            carts.forEach(cart => {
                totalPrice += cart.Product.price
                productAndQty.push([cart.Product.id, cart.quantity])
            })
            return History.create({ transactionCode, purchaseDate, UserId: id, totalItem, totalPrice })
        })
        .then(data => {
            history = data;

            productAndQty.forEach((el, i) => {
                Product.findAll({
                    where: { id: el[0] }
                })
                .then(data => {
                    productAndQty[i].push(data[0].stock)
                    // console.log(productAndQty)
                    return Product.update({ stock: productAndQty[i][2] - productAndQty[i][1] }, { where: {
                        id: productAndQty[i][0]
                      } 
                    })
                })
                .then ((data) => {
                    console.log(data, 'Updated success')
                }) 
                .catch(err => {
                    next({ code:500, message: err.message, from: 'checkoutController.js' })
                })
            })

            return Cart.destroy({
                where: {
                    UserId: id
                }
            })
        })
        .then((data) => {
            // console.log(history)
            // console.log(data)
            res.status(201).json({ history, message: "Checkout Success"})
        })
        .catch(err => {
            next({ code:500, message: err.message, from: 'checkoutController.js' })
        })

    }

    static showAllHistory (req, res, next) {
        // console.log(req.currentUser)
        let { id, email, customer } = req.currentUser;

        History.findAll({
            where: {UserId: id}
        })
        .then(histories => {
            // console.log(histories)
            res.status(200).json(histories)
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'checkoutController.js' })
        })

    }

}

module.exports = CheckoutController