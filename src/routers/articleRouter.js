const koaRouter = require("@koa/router")
const multer = require('@koa/multer');
const authToken = require("../middleware/users/authToken")
const { addArticle, getArticleInfo, getArticleList, deleteArticle, getAllArticleNum,
    getNewArticleNum, getCateArticleNum, getMonthNum } = require("../controller/article")

const upload = multer();
const articleRouter = new koaRouter({
    prefix: "/article"
})

articleRouter.post("/add", authToken, upload.any(), addArticle)
articleRouter.get("/info", authToken, getArticleInfo)
articleRouter.get("/list", authToken, getArticleList)
articleRouter.delete("/info", authToken, deleteArticle)
articleRouter.get("/all", authToken, getAllArticleNum)
articleRouter.get("/new", authToken, getNewArticleNum)
articleRouter.get("/cateNum", authToken, getCateArticleNum)
articleRouter.get("/monthNum", authToken, getMonthNum)
module.exports = articleRouter