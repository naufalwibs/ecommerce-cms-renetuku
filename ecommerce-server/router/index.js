const express = require('express');
const router = express.Router();
const accountsRoute = require('./accountsRoute');
const productsRoute = require('./productsRoute');
const bannersRoute = require('./bannersRoute');
const cartRoute = require('./cartRoute');
const wishlistsRoute = require('./wishlistRoute');
const checkoutRoute = require('./checkoutRoute')

router.use(accountsRoute);
router.use(productsRoute);
router.use(bannersRoute);
router.use(cartRoute);
router.use(wishlistsRoute);
router.use(checkoutRoute);


module.exports = router;