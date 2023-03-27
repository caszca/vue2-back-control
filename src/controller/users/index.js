const fs = require("fs")
const path = require("path")
const { registryDB, loginDB, updataAvatarDB, getUserInfoDB,
    updateUserInfoDB, getUserPwd, updatePwdDB } = require("@/database/users")
const hash = require("@/utils/bcrypt/userBcrypt")
const checkBcrypt = require("@/utils/bcrypt/checkBcrypt")
const createToken = require("@/config/token/createToken")
class usersController {
    async registry(ctx, next) {
        const { username, password, repassword } = ctx.request.body
        if (password != repassword) {
            ctx.body = {
                code: 2,
                message: "输入密码不一致"
            }
            return
        }
        await registryDB(username, hash(password))
        ctx.body = {
            "code": 0,
            "message": "注册成功！"
        }
    }

    //登录
    async login(ctx, next) {
        const { username, password } = ctx.request.body
        const value = await loginDB(username)
        const result = checkBcrypt(password, value.password)
        if (!result) {
            ctx.body = {
                "code": 1,
                "message": "登录失败！"
            }
            return
        }
        const token = createToken(value.id)
        ctx.body = {
            code: 0,
            message: "登录成功！",
            token: "Bearer " + token
        }
    }
    //获取用户信息
    async getUserInfo(ctx, next) {
        const { userId } = ctx.request
        const data = await getUserInfoDB(userId)
        ctx.body = 2
        const message = {
            "code": 0,
            "message": "获取用户基本信息成功！",
            data
        }
        if (!data.user_pic) {
            ctx.body = message
            return
        }
        const user_pic = fs.readFileSync(path.resolve("src/uploads/", data.user_pic), {
            encoding: "utf-8"
        })
        message.data.user_pic = user_pic
        ctx.body = 1
        ctx.body = message
    }

    //更新用户信息
    async updateUserInfo(ctx, next) {
        const { id, nickname, email } = ctx.request.body

        if (!id) {
            ctx.body = {
                "code": 2,
                "message": "id is required"
            }
        }

        await updateUserInfoDB(Number(id), nickname, email)
        ctx.body = {
            "code": 0,
            "message": "修改用户信息成功！"
        }
    }

    //更新用户头像
    async updateAvatar(ctx, next) {
        const { avatar } = ctx.request.body
        const filename = Date.now() + ".txt"
        const uploads = path.resolve("src/uploads/", filename)

        await fs.promises.writeFile(uploads, avatar)

        await updataAvatarDB(filename, avatar.length, ctx.request.userId)
        ctx.body = {
            "code": 0,
            "message": "更新头像成功！"
        }
    }

    //更新用户密码
    async updatePwd(ctx, next) {
        const { old_pwd, new_pwd, re_pwd } = ctx.request.body
        const { userId } = ctx.request
        const { password } = await getUserPwd(userId)
        const result = checkBcrypt(old_pwd, password)
        if (!result) {
            ctx.body = {
                "code": 1,
                "message": "原密码错误！"
            }
            return
        }
        await updatePwdDB(userId, hash(new_pwd))
        ctx.body = {
            "code": 0,
            "message": "更新密码成功！"
        }
    }
}

module.exports = new usersController()