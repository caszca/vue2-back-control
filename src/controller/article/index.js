const fs = require("fs")
const path = require("path")
const { addArticle, getArticleDB, getArticleListDB, findArticleDB, deleteArticleDB } = require("@/database/article")
class articleController {
    async addArticle(ctx, next) {
        const data = ctx.request.body
        if (data.state != "草稿" || data.state != "已发布") {
            ctx.body = {
                "code": 2,
                "message": "\"state\" must be one of [草稿, 已发布]"
            }
            return
        }
        data.author_id = ctx.request.userId

        const { mimetype, buffer } = ctx.request.files[0]
        const suffix = Date.now() + "." + mimetype.replace("image/", "")
        data.cover_img = "/" + suffix

        fs.writeFileSync(path.resolve("uploads/", suffix), buffer)
        await addArticle(data)
        ctx.body = {
            "code": 0,
            "message": "发布文章成功！"
        }
    }

    //获取图片
    getArticleImg(ctx, next) {
        const { imgName } = ctx.request.params
        ctx.body = fs.createReadStream(`uploads/${imgName}`)
    }

    //获取文章详情
    async getArticleInfo(ctx, next) {

        const { id } = ctx.request.query
        if (!id) {
            ctx.body = {
                "code": 2,
                "message": "\"id\" is required"
            }
            return
        }

        const data = await getArticleDB(id)
        if (!data) {
            ctx.body = {
                "code": 1,
                "message": "没有查到对应的数据！"
            }
            return
        }
        ctx.body = {
            "code": 0,
            "message": "获取文章成功！",
            data
        }

    }

    //获取文章列表
    async getArticleList(ctx, next) {
        const value = ctx.request.query
        value.userId = ctx.request.userId
        const data = await getArticleListDB(value)
        ctx.body = {
            "code": 0,
            "message": "获取文章列表成功！",
            "total": data.length,
            data
        }
    }

    //删除文章
    async deleteArticle(ctx, next) {
        const { id } = ctx.request.query
        const { userId } = ctx.request
        const result = await findArticleDB(id, userId)
        if (!result) {
            ctx.body = {
                "code": 1,
                "message": "您要删除的文章不存在！"
            }
            return
        }
        await deleteArticleDB(id, userId)
        ctx.body = {
            "code": 0,
            "message": "删除成功！"
        }
    }
}


module.exports = new articleController()