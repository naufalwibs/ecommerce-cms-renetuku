const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')

class AccountController {
    static login(req, res, next) {
        let { email, password } = req.body;

        User.findOne({ 
            where: { email }  
        })
        .then(user => {
            if (user) {
                if (user.role === "admin") {
                    let comparedPassword = comparePassword(password, user.password)
                    if(comparedPassword) {
                        let payload = {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }
                        let token = generateToken(payload)
                        res.status(200).json({ id: payload.id, email: payload.email, role: payload.role, access_token: token })
                    } else {
                        next({ code: 401, message: "Invalid Email/Password", from:"AccountController.login" })
                    }
                } else {
                    next({ code: 401, message: "Unauthorized, only admin can login to this page", from : "AccountController.login" })
                }
            } else {
                next({ code: 401, message: "Invalid Email/Password", from:"AccountController.login" })
            }
        })
        .catch(err => {
            next({ code: 500, message: err.message, from:"AccountController.login" })
        })
    }

    static loginCustomer (req, res, next) {
        console.log(req.body)
        let { email, password } = req.body;

        User.findOne({ 
            where: { email }  
        })
        .then(user => {
            if (user) {
                    let comparedPassword = comparePassword(password, user.password)
                    if(comparedPassword) {
                        let payload = {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }
                        let token = generateToken(payload)
                        res.status(200).json({ id: payload.id, email: payload.email, role: payload.role, access_token: token })
                    } else {
                        next({ code: 401, message: "Invalid Email/Password", from:"AccountController.login" })
                    }
            } else {
                next({ code: 401, message: "Invalid Email/Password", from:"AccountController.login" })
            }
        })
        .catch(err => {
            next({ code: 500, message: err.message, from:"AccountController.login" })
        })
    }

    static register (req, res, next) {
        let { email, password } = req.body

        User.create({ email, password })
        .then(user => {
            // console.log(user)
            res.status(201).json({ id: user.id, email: user.email, message: 'Account successfully created, please login to continue' })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = AccountController
