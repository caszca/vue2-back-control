const { checkCateIdDB } = require("@/database/category")
async function checkCateId(ctx, next) {
    const { userId } = ctx.request
    const { id } = ctx.request.query
    const result = await checkCateIdDB(id, userId)
    if (!result) {
        ctx.body = {
            "code": 1,
            "message": "要删除的分类不存在！"
        }
        return
    }
    await next()
}

module.exports = checkCateId