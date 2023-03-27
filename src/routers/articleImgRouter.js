const koaRouter = require("@koa/router")
const { getArticleImg } = require("../controller/article")
const authToken = require("../middleware/users/authToken")
const articleImgRouter = new koaRouter()

articleImgRouter.get("/:imgName", getArticleImg)

module.exports = articleImgRouter 