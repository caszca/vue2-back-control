const { addLangCateDB, getLangCateListDB, getLangCateInfoDB,
    deleteLangCateDB, updateLangCateInfoDB } = require("@/database/langCate")

class langCateController {
    async addLangCate(ctx, next) {
        const { lang_name, lang_use } = ctx.request.body
        const { userId } = ctx.request
        await addLangCateDB(lang_name, lang_use, userId)
        ctx.body = {
            "code": 0,
            "message": "新增语言分类成功！"
        }
    }

    //获取语言分类
    async getLangCateList(ctx, next) {
        const { userId } = ctx.request
        const data = await getLangCateListDB(userId)
        ctx.body = {
            "code": 0,
            "message": "获取日志分类列表成功！",
            data
        }
    }

    //获取语言分类详情
    async getLangCateInfo(ctx, next) {
        const { userId } = ctx.request
        const { id } = ctx.request.query
        const data = await getLangCateInfoDB(id, userId)
        ctx.body = {
            "code": 0,
            "message": "获取日志分类成功！",
            data
        }
    }

    //删除语言分类
    async deleteLangCate(ctx, next) {
        const { userId } = ctx.request
        const { id } = ctx.request.query
        await deleteLangCateDB(id, userId)
        ctx.body = {
            "code": 0,
            "message": "删除日志分类成功！"
        }
    }

    //更新语言分类详情
    async updateLangCateInfo(ctx, next) {
        const { userId } = ctx.request
        const { id, lang_name, lang_use } = ctx.request.body
        if (id < 1) {
            ctx.body = {
                "code": 2,
                "message": "\"id\" must be greater than or equal to 1"
            }
            return
        }

        await updateLangCateInfoDB(lang_name, lang_use, userId, id)
        ctx.body = {
            "code": 0,
            "message": "更新分类信息成功！"
        }

    }
}

module.exports = new langCateController()