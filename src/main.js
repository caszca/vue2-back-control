require("module-alias/register");
const koa = require("koa");
const cors = require("@koa/cors");
const { SERVER_PORT } = require("./config/server");
const bodyParser = require("koa-bodyparser");
const usersRouter = require("./routers/usersRouter");
const tabRouter = require("./routers/tabRouter");
const cateRouter = require("./routers/cateRouter");
const articleRouter = require("./routers/articleRouter");
const articleImgRouter = require("./routers/articleImgRouter");
const langCateRouter = require("./routers/LangCateRouter");
const app = new koa();
app.use(cors());
app.use(bodyParser());
app.use(usersRouter.routes());
app.use(tabRouter.routes());
app.use(cateRouter.routes());
app.use(articleRouter.routes());
app.use(articleImgRouter.routes());
app.use(langCateRouter.routes());

app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功", SERVER_PORT);
});
