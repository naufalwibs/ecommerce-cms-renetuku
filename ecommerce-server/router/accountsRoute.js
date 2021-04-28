const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController')

router.post('/register', AccountController.register)
router.post('/login', AccountController.login)
router.post('/loginCustomer', AccountController.loginCustomer)

module.exports = router;