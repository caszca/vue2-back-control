const router = require("@koa/router")
const { registry, login, getUserInfo, updateAvatar, updateUserInfo, updatePwd } = require("../controller/users")
const { verifyUser } = require("../middleware/users")
const authToken = require("../middleware/users/authToken")
const usersRouter = new router({
    prefix: "/users"
})

usersRouter.post("/reg", verifyUser, registry)
usersRouter.post("/login", login)
usersRouter.get("/userInfo", authToken, getUserInfo)
usersRouter.patch("/update/avatar", authToken, updateAvatar)
usersRouter.put("/userInfo", authToken, updateUserInfo)
usersRouter.patch("/updatepwd", authToken, updatePwd)
module.exports = usersRouter