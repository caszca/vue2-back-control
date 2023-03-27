const { verifyUserDB } = require("@/database/users")
class usersMiddleware {
    async verifyUser(ctx, next) {
        const { username } = ctx.request.body
        const data = await verifyUserDB(username)
        if (data.count) {
            ctx.body = {
                "code": 1,
                "message": "用户名被占用，请更换其他用户名！"
            }
            return
        }
        await next()
    }
}

module.exports = new usersMiddleware()