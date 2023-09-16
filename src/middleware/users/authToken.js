//验证token
const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")
const publicKey = fs.readFileSync(path.resolve("src/config/token/public.key"))

async function authToken(ctx, next) {

    let { authorization } = ctx.request.header
    if (!authorization) {
        ctx.body = {
            "code": 1,
            "message": "身份认证失败！"
        }
        return
    }
    
    authorization = authorization.replace("Bearer ", "")
    jwt.verify(authorization, publicKey, function (err, decoded) {
        if (err) {
            ctx.body = {
                "code": 1,
                "message": "身份认证失败！"
            }
            return
        }
        ctx.request.userId = decoded.id
    })
    await next()
}

module.exports = authToken