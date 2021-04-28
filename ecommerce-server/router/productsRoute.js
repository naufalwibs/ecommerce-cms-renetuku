const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const { authenticate, authorizeProduct } = require('../middlewares/auth')

router.get('/products', productController.showAllProduct);
router.post('/products', authenticate, productController.addProduct);
router.get('/products/:id', authenticate, authorizeProduct ,productController.showProductById);
router.put('/products/:id', authenticate, authorizeProduct, productController.editProduct);
router.delete('/products/:id', authenticate, authorizeProduct, productController.deleteProduct);

module.exports = router;