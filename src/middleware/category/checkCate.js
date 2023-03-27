const { checkCateAlerady } = require("@/database/category")

async function checkCate(ctx, next) {
    const { cate_name } = ctx.request.body
    const { userId } = ctx.request
    const data = await checkCateAlerady(cate_name, userId)
    if (data) {
        ctx.body = {
            "code": 1,
            "message": "此分类已存在！"
        }
        return
    }
    await next()
}

module.exports = checkCate