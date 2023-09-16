const fs = require("fs")
const path = require("path")
const dayjs = require("dayjs")
const { addArticle, getArticleDB, getArticleListDB, findArticleDB,
    deleteArticleDB, getAllArticleNumDB, getNewArticleNumDB,
    getCateArticleDB, getMonthNumDB, getHumorNumDB } = require("@/database/article")
const main = require("@/utils/humor")
const format = require("@/dayjs")
class articleController {

    //添加日志
    async addArticle(ctx, next) {
        const data = ctx.request.body

        if (data.state != "草稿" && data.state != "已发布") {
            ctx.body = {
                "code": 2,
                "message": "\"state\" must be one of [草稿, 已发布]"
            }
            return
        }
        
        data.author_id = ctx.request.userId

        const data1 = await main(data.content.slice(0, 1000).replace(/<[^>]*>/g, '').trim())

        const { positive_prob, neutral_prob, negative_prob } = JSON.parse(data1.data).result


        const { mimetype, buffer } = ctx.request.files[0]
        const suffix = Date.now() + "." + mimetype.replace("image/", "")
        data.cover_img = "/" + suffix

        fs.writeFileSync(path.resolve("uploads/", suffix), buffer)
        await addArticle(data, positive_prob, neutral_prob, negative_prob)
        ctx.body = {
            "code": 0,
            "message": "发布日志成功！"
        }
    }

    //获取图片
    getArticleImg(ctx, next) {
        const { imgName } = ctx.request.params
        ctx.body = fs.createReadStream(`uploads/${imgName}`)
    }


    //获取日志详情
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
            "message": "获取日志成功！",
            data
        }

    }

    //获取日志列表
    async getArticleList(ctx, next) {
        const value = ctx.request.query
        const pagesize = Number(value.pagesize)
        value.pagenum = String((Number(value.pagenum) - 1) * pagesize)
        value.userId = ctx.request.userId

        let [data, { total }] = await getArticleListDB(value)


        ctx.body = {
            "code": 0,
            "message": "获取日志列表成功！",
            total,
            data
        }
    }

    //删除日志
    async deleteArticle(ctx, next) {
        const { id } = ctx.request.query
        const { userId } = ctx.request
        const result = await findArticleDB(id, userId)
        if (!result) {
            ctx.body = {
                "code": 1,
                "message": "您要删除的日志不存在！"
            }
            return
        }
        await deleteArticleDB(id, userId)
        ctx.body = {
            "code": 0,
            "message": "删除日志成功！"
        }
    }

    //获取所有日志数量
    async getAllArticleNum(ctx, next) {
        const { userId } = ctx.request
        const data = await getAllArticleNumDB(userId)
        ctx.body = {
            code: "0",
            message: "查询成功",
            data
        }
    }

    //获取日增日志数量
    async getNewArticleNum(ctx, next) {
        const { userId } = ctx.request
        const date = format(Date.now())
        const data = await getNewArticleNumDB(userId, date)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data
        }
    }

    //获取分类日志的数量
    async getCateArticleNum(ctx, next) {
        const { userId } = ctx.request
        const data = await getCateArticleDB(userId)
        ctx.body = {
            code: '0',
            message: "查询成功",
            data
        }
    }

    //获取不同分类前四月数量
    async getMonthNum(ctx, next) {
        const { userId } = ctx.request
        const month = dayjs().format("YYYY-MM")

        const month1 = dayjs(month).subtract(1, "month").format("YYYY-MM")
        const month2 = dayjs(month1).subtract(1, "month").format("YYYY-MM")
        const month3 = dayjs(month2).subtract(1, "month").format("YYYY-MM")
        const month4 = dayjs(month3).subtract(1, "month").format("YYYY-MM")
        const month5 = dayjs(month4).subtract(1, "month").format("YYYY-MM")
        let data = await getMonthNumDB(userId, month, month1, month2, month3, month4, month5)

        ctx.body = {
            code: 0,
            message: "查询成功",
            data
        }
    }

    //得不同心情日志数量
    async getHumorNum(ctx, next) {
        const { userId } = ctx.request
        const data = await getHumorNumDB(userId)
        ctx.body = {
            code: 0,
            message: "查询成功",
            data
        }
    }
}


module.exports = new articleController()