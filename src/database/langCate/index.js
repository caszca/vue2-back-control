const connection = require("../index")
class langCategoryDB {

    //添加分类
    async addLangCateDB(lang_name, lang_use, userId) {
        const statement = "insert into langCate (lang_name,lang_use,userId) values (?,?,?);"
        await connection.execute(statement, [lang_name, lang_use, userId])
    }
    
    //获取语言分类
    async getLangCateListDB(userId) {
        const statement = "select id,lang_name,lang_use from langCate where userId=?;"
        const [value] = await connection.execute(statement, [userId])
        return value
    }


    //查询语言分类详情
    async getLangCateInfoDB(id, userId) {
        const statement = "select id,lang_name,lang_use from langCate where id=? and userId=?; "
        const [value] = await connection.execute(statement, [id, userId])
        return value[0]
    }


    //删除语言分类
    async deleteLangCateDB(id, userId) {
        const statement = "delete from langCate where id=? and userId=?;"
        await connection.execute(statement, [id, userId])
    }



    //更新语言分类详情
    async updateLangCateInfoDB(lang_name, lang_use, userId, id) {
        const statement = " update langCate set lang_name=?,lang_use=? where userId=? and id=?;"
        await connection.execute(statement, [lang_name, lang_use, userId, id])
    }

}

module.exports = new langCategoryDB()