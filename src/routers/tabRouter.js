const koaRouter = require("@koa/router")
const { getTabList } = require("../controller/tabList")
const authToken = require("../middleware/users/authToken")
const tabRouter = new koaRouter({
    prefix: "/tablist"
})

tabRouter.get("/", authToken, getTabList)
module.exports = tabRouter