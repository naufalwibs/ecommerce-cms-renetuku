const { User, Product, Banner, Cart, Wishlist } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authenticate = (req, res, next) => {
    if(req.headers.access_token) {
        try {
        let { id, email, role } = verifyToken(req.headers.access_token)
            User.findOne({
                where: { email }
            })
            .then(user => {
                if (user) {
                    req.currentUser = { id: user.id, email: user.email, role: user.role }
                    next()
                } else {
                    next({ code: 401, message: 'Unauthorized, only admin can perform this action', from: 'auth.js' })
                }
            })
            .catch(err => {
                next({ code: 500, message: err.message, from: 'auth.js' })
            })        
        } catch (err) {
            next(err)
        }
    } else {
        next({ code: 401, message: 'Unauthorized, you must login first', from: 'auth.js' })
    }

}

const authorizeProduct = (req, res, next) => {
    let { id, email, role } = req.currentUser;

    Product.findOne({ 
        where: { id: req.params.id } 
    })
    .then(product => {
        if (product) {
            if (product.UserId === id) {
                next()
            } else {
                next({ code: 401, message: "You don't have permission to have access this product", from: 'auth.js'})
            }
        } else {
            next({ code: 404, message: 'Data not found', from: 'auth.js' })
        }
    })
    .catch(err => {
        next({ code: 500, message: err.message, from: 'auth.js' })
    })
}

const authorizeBanner = (req, res, next) => {
    let { id, email, role } = req.currentUser;

    if (role === 'admin') {
        Banner.findOne({ 
            where: { id: req.params.id } 
        })
        .then(banner => {
            if (banner) {
                if (banner.UserId === id) {
                    next()
                } else {
                    next({ code: 401, message: "You don't have permission to have access this banner", from: 'auth.js'})
                }
            } else {
                next({ code: 404, message: 'Data not found', from: 'auth.js' })
            }
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'auth.js' })
        })
    } else {
        next({ code: 401, message: err.message, from: 'auth.js' })
    }

}

const authorizeCart = (req, res, next) => {
    let { id, email, role } = req.currentUser;

    if (req.params.ProductId) {
        Product.findOne({ 
            where: { id: req.params.ProductId } 
        })
        .then(product => {
            if (product) {
                next()
            } else {
                next({ code: 404, message: 'Data not found', from: 'auth.js' })
            }
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'auth.js' })
        })
    } else if (req.params.id) {
        Cart.findOne({ 
            where: { id: req.params.id } 
        })
        .then(cart => {
            if (cart) {
                if (cart.UserId === id) {
                    next()
                } else {
                    next({ code: 401, message: "You don't have permission to this cart", from: 'auth.js'})
                }
            } else {
                next({ code: 404, message: 'Data not found', from: 'auth.js' })
            }
        })
        .catch(err => {
            next({ code: 500, message: err.message, from: 'auth.js' })
        })
    } else {
        next({ code: 500, message: err.message, from: 'auth.js' })
    }

}

const authorizeWishlist = (req, res, next) => {
    let { id, email, role } = req.currentUser;
    console.log(req.params)
    Wishlist.findOne({ 
        where: { id: req.params.id } 
    })
    .then(wishlist => {
        if (wishlist) {
            if (wishlist.UserId === id) {
                next()
            } else {
                next({ code: 401, message: "You don't have permission to this wishlist", from: 'auth.js'})
            }
        } else {
            next({ code: 404, message: 'Data not found', from: 'auth.js' })
        }
    })
    .catch(err => {
        next({ code: 500, message: err.message, from: 'auth.js' })
    })
}

module.exports = {
    authenticate,
    authorizeProduct,
    authorizeBanner,
    authorizeCart,
    authorizeWishlist
}