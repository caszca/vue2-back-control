//日志分类
const koaRouter = require("@koa/router")
const { addLangCate, getLangCateList, getLangCateInfo,
    deleteLangCate, updateLangCateInfo } = require("../controller/langCate")
//const { addCate, getCateList, getCateInfo, updateCateInfo, deleteCate } = require("../controller/category")
//const checkCate = require("../middleware/category/checkCate")
//const checkCateId = require("../middleware/category/checkCateId")
const authToken = require("../middleware/users/authToken")
const langCateRouter = new koaRouter({
    prefix: "/langCate"
})

//cateRouter.post("/add", authToken, checkCate, addCate)
// cateRouter.get("/list", authToken, getCateList)
// cateRouter.get("/info", authToken, getCateInfo)
// cateRouter.put("/info", authToken, updateCateInfo)
// cateRouter.delete("/del", authToken, checkCateId, deleteCate)

langCateRouter.post("/add", authToken, addLangCate)
langCateRouter.get("/list", authToken, getLangCateList)
langCateRouter.get("/info", authToken, getLangCateInfo)
langCateRouter.delete("/del", authToken, deleteLangCate)
langCateRouter.put("/info", authToken, updateLangCateInfo)

module.exports = langCateRouter