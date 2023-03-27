const koaRouter = require("@koa/router")
const multer = require('@koa/multer');
const authToken = require("../middleware/users/authToken")
const { addArticle, getArticleInfo, getArticleList, deleteArticle } = require("../controller/article")

const upload = multer();
const articleRouter = new koaRouter({
    prefix: "/article"
})

articleRouter.post("/add", authToken, upload.any(), addArticle)
articleRouter.get("/info", authToken, getArticleInfo)
articleRouter.get("/list", authToken, getArticleList)
articleRouter.delete("/info", authToken, deleteArticle)
module.exports = articleRouter