const bcrypt = require('bcryptjs');

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

function comparePassword(password, passwordDB) {
    return bcrypt.compareSync(password, passwordDB)
}

module.exports = {
    hashPassword,
    comparePassword
}