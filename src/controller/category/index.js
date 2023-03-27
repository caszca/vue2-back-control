const { addCateDB, getCateList, getCateInfoDB, updateCateInfoDB, deleteCateDB } = require("@/database/category")
class cateController {
    //添加文章分类
    async addCate(ctx, next) {
        const { cate_name, cate_alias } = ctx.request.body
        const { userId } = ctx.request
        await addCateDB(cate_name, cate_alias, userId)
        ctx.body = {
            "code": 0,
            "message": "新增文章分类成功！"
        }
    }

    //获取文章分类
    async getCateList(ctx, next) {
        const { userId } = ctx.request
        const data = await getCateList(userId)
        ctx.body = {
            "code": 0,
            "message": "获取文章分类列表成功！",
            data
        }
    }

    //获取文章分类详情
    async getCateInfo(ctx, next) {
        const { userId } = ctx.request
        const { id } = ctx.request.query
        const data = await getCateInfoDB(id, userId)
        ctx.body = {
            "code": 0,
            "message": "获取文章分类成功！",
            data
        }
    }

    //更新文章分类详情
    async updateCateInfo(ctx, next) {
        const { userId } = ctx.request
        const { id, cate_name, cate_alias } = ctx.request.body
        if (id < 1) {
            ctx.body = {
                "code": 2,
                "message": "\"id\" must be greater than or equal to 1"
            }
            return
        }

        await updateCateInfoDB(cate_name, cate_alias, userId, id)
        ctx.body = {
            "code": 0,
            "message": "更新分类信息成功！"
        }

    }

    //删除文章分类
    async deleteCate(ctx, next) {
        const { userId } = ctx.request
        const { id } = ctx.request.query
        await deleteCateDB(id, userId)
        ctx.body = {
            "code": 0,
            "message": "删除文章分类成功！"
        }
    }
}

module.exports = new cateController()