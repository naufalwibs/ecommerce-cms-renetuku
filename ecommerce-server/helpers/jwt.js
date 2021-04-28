const jwt = require('jsonwebtoken');

let secretKey = process.env.JWT_SECRET

const generateToken = (payload) => jwt.sign(payload, secretKey)
const verifyToken = (token) => jwt.verify(token, secretKey)

module.exports = {
    generateToken,
    verifyToken
}