const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")

const privateKey = fs.readFileSync(path.join(__dirname, "./private.key"))

function createToken(id) {
    const token = jwt.sign({ id }, privateKey, {
        algorithm: 'RS256',
        expiresIn: "720h"
    })
    return token
}

module.exports = createToken

