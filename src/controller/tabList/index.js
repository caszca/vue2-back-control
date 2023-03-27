const { getTabList } = require("@/database/tabList")
class tabController {
    async getTabList(ctx, next) {
        const data = await getTabList()
        for (const item of data) {
            if (!item.children[0].icon) {
                item.children = null
            }
        }
        ctx.body = {
            "code": 0,
            "message": "获取左侧菜单成功！",
            data
        }
    }
}

module.exports = new tabController()