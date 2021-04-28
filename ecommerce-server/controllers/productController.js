const { User, Product } = require('../models')

class ProductController {
    static addProduct(req, res, next) {
        let { id, email, role } = req.currentUser;
        let { name, category, stock, price, image_url } = req.body

        Product.create({ name, category, stock, price, image_url, UserId: id })
        .then((newProduct) => {   
            res.status(201).json({newProduct, message: "Product Added Succesfully"})
        })
        .catch(err => {
            next(err)
        })
    }

    static showAllProduct(req, res, next) {
        Product.findAll({
            order: [
                ['updatedAt', 'DESC']
            ]
        })
        .then(products => {
            res.status(200).json({ products, message: "Product Loaded Successfully" })
        })
        .catch(err => {
            next({ code : 500, message: "Internal server error", from : "ProductController.showAllProduct" })
        })
    }

    static showProductById(req, res, next) {
        let productId = req.params.id;
        let { id, email, role } = req.currentUser;

        Product.findOne({
            where: {
                id: productId,
                UserId: id
            }
        })
        .then(product => {
            res.status(200).json({ product, message : "Product Loaded Successfully" })
        })
        .catch(err => {
            next({ code : 500, message: "Internal server error", from : "ProductController.showProductById" })
        })
    }

    static editProduct(req, res, next) {
        let productId = req.params.id;
        let { id, email, role } = req.currentUser;
        let { name, category, stock, price, image_url } = req.body;

        Product.update({ name, category, stock, price, image_url }, {
            where: { id: productId }
        })
        .then(product => {
            res.status(200).json({ message: "Product Updated Succesfully" })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct(req, res, next) {
        let productId = req.params.id;
        
        Product.destroy({ where: {
            id : productId }
        })
        .then(() => {
            res.status(200).json({ message : "Product deleted successfully"})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = ProductController;