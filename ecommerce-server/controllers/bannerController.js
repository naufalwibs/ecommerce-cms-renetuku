const { User, Banner } = require('../models')

class BannerController {
    static addBanner(req, res, next) {
        let { id, email, role } = req.currentUser;
        let { banner_url, category, status } = req.body

        Banner.create({ banner_url, category, status, UserId: id })
        .then((newBanner) => {   
            res.status(201).json({newBanner, message: "Banner Added Succesfully"})
        })
        .catch(err => {
            next(err)
        })
    }

    static showAllBanner(req, res, next) {
        Banner.findAll({
            order: [
                ['updatedAt', 'DESC']
            ]
        })
        .then(banners => {
            res.status(200).json({ banners, message: "Product Loaded Successfully" })
        })
        .catch(err => {
            next({ code : 500, message: err.message, from : "BannerController.showAllBanner" })
        })
    }

    static showBannerById(req, res, next) {
        let bannerId = req.params.id;
        let { id, email, role } = req.currentUser;

        Banner.findOne({
            where: {
                id: bannerId,
                UserId: id
            }
        })
        .then(banner => {
            console.log(banner)
            res.status(200).json({ banner, message : "Banner Loaded Successfully" })
        })
        .catch(err => {
            next({ code : 500, message: err.message, from : "ProductController.showBannerById" })
        })
    }

    static editBanner(req, res, next) {
        let bannerId = req.params.id;
        let { id, email, role } = req.currentUser;
        let { banner_url, category, status } = req.body

        Banner.update({ banner_url, category, status }, {
            where: { id: bannerId }
        })
        .then(banner => {
            res.status(200).json({ message: "Banner Updated Succesfully" })
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteBanner(req, res, next) {
        let bannerId = req.params.id;
        
        Banner.destroy({ where: {
            id : bannerId }
        })
        .then(() => {
            res.status(200).json({ message : "Banner deleted successfully"})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = BannerController;