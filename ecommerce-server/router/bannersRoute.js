const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { authenticate, authorizeBanner } = require('../middlewares/auth')

router.get('/banners', bannerController.showAllBanner);
router.post('/banners', authenticate, bannerController.addBanner);
router.get('/banners/:id', authenticate, authorizeBanner ,bannerController.showBannerById);
router.put('/banners/:id', authenticate, authorizeBanner, bannerController.editBanner);
router.delete('/banners/:id', authenticate, authorizeBanner, bannerController.deleteBanner);

module.exports = router;