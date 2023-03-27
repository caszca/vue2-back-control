const connection = require("../index")
class categoryDB {

    //检查是否已有分类
    async checkCateAlerady(cate_name, userId) {
        const statement = "select * from category where userId=? and cate_name=? ;"
        const [value] = await connection.execute(statement, [userId, cate_name])
        return value.length
    }
    //添加分类
    async addCateDB(cate_name, cate_alias, userId) {
        const statement = "insert into category (cate_name,cate_alias,userId) values (?,?,?);"
        await connection.execute(statement, [cate_name, cate_alias, userId])
    }

    //获取文章分类
    async getCateList(userId) {
        const statement = "select id,cate_name,cate_alias from category where userId=?;"
        const [value] = await connection.execute(statement, [userId])
        return value
    }

    //查询文章分类详情
    async getCateInfoDB(id, userId) {
        const statement = "select id,cate_name,cate_alias from category where id=? and userId=?; "
        const [value] = await connection.execute(statement, [id, userId])
        return value[0]
    }

    //更新文章分类详情
    async updateCateInfoDB(cate_name, cate_alias, userId, id) {
        const statement = " update category set cate_name=?,cate_alias=? where userId=? and id=?;"
        await connection.execute(statement, [cate_name, cate_alias, userId, id])
    }

    //检查是否有需删除的分类
    async checkCateIdDB(id, userId) {
        const statement = "select * from category where id=? and userId=?;"
        const [value] = await connection.execute(statement, [id, userId])
        return value.length
    }

    //删除文章分类
    async deleteCateDB(id, userId) {
        const statement = "delete from category where id=? and userId=?;"
        await connection.execute(statement, [id, userId])
    }
}

module.exports = new categoryDB()