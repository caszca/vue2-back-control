//日志分类
const koaRouter = require("@koa/router")
const { addCate, getCateList, getCateInfo, updateCateInfo, deleteCate } = require("../controller/category")
const checkCate = require("../middleware/category/checkCate")
const checkCateId = require("../middleware/category/checkCateId")
const authToken = require("../middleware/users/authToken")
const cateRouter = new koaRouter({
    prefix: "/cate"
})

cateRouter.post("/add", authToken, checkCate, addCate)
cateRouter.get("/list", authToken, getCateList)
cateRouter.get("/info", authToken, getCateInfo)
cateRouter.put("/info", authToken, updateCateInfo)
cateRouter.delete("/del", authToken, checkCateId, deleteCate)
module.exports = cateRouter