const connection = require("../index")

class usersDB {
    //校验用户名是否重复
    async verifyUserDB(username) {
        const statement = "select count(*) count from users where username= ?;"
        const [value] = await connection.execute(statement, [username])
        return value[0]
    }

    //注册
    async registryDB(username, password) {
        const statement = "insert into users (username,password) values (?,?) ;"
        await connection.execute(statement, [username, password])

    }

    //登录
    async loginDB(username, password) {
        const statement = "select id,password from users where username= ?;"
        const [value] = await connection.execute(statement, [username])
        return value[0]
    }

    //获取用户信息
    async getUserInfoDB(userId) {
        const statement = "select id,username,nickname,email,user_pic from users where id=?;"
        const [value] = await connection.execute(statement, [userId])
        return value[0]
    }

    //更新用户信息
    async updateUserInfoDB(id, nickname, email) {
        const statement = "update users set nickname=?, email=? where id=?;"
        await connection.execute(statement, [nickname, email, id])
    }

    //更新用户头像
    async updataAvatarDB(filename, size, userId) {
        let statement = "insert into avatars (filename,size,userId) values (?,?,?);"
        connection.execute(statement, [filename, size, userId])
        statement = "update users set user_pic=? where id=?;"
        await connection.execute(statement, [filename, userId])
    }

    //获取用户密码
    async getUserPwd(userId) {
        const statement = "select password from users where id=?;"
        const [value] = await connection.execute(statement, [userId])
        return value[0]
    }

    //更新用户密码
    async updatePwdDB(userId, new_pwd) {
        const statement = "update users set password=? where id=?;"
        await connection.execute(statement, [new_pwd, userId])
    }
}

module.exports = new usersDB()