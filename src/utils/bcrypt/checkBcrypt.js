const bcrypt = require("bcrypt")

function checkBcrypt(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash)
}

module.exports = checkBcrypt