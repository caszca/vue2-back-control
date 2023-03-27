const connection = require("../index")

class articleDB {
    async addArticle({ title, cate_id, content, cover_img, state, author_id }) {

        const statement = "insert into article (title,cate_id,content,cover_img,state,author_id) values (?,?,?,?,?,?);"
        await connection.execute(statement, [title, cate_id, content, cover_img, state, author_id])
    }

    //得到文章详情
    async getArticleDB(id) {
        const statement = `
        select a.id,title,content,cover_img,pub_date,state,
        cate_id,author_id,cate_name,username,nickname from article a left join users u 
        on a.author_id=u.id left join category c on cate_id=c.id where a.id=?; 
        `
        const [value] = await connection.execute(statement, [id])
        return value[0]
    }

    //得到文章列表
    async getArticleListDB({ cate_id, userId, state, pagesize, pagenum }) {

        const statement = `
        select a.id,title,pub_date,state,cate_name from article a left join category c 
        on a.cate_id=c.id where author_id=? and cate_id=? and state=? limit ? offset ?;
        `
        const [value] = await connection.execute(statement, [userId, cate_id, state, pagesize, pagenum])
        return value
    }

    //查找用户的文章是否存在
    async findArticleDB(id, userId) {
        const statement = "select * from article where id=? and author_id=?;"
        const [value] = await connection.execute(statement, [id, userId])
        return value.length
    }

    //删除文章
    async deleteArticleDB(id, userId) {
        const statement = "delete from article where id=? and author_id=?;"
        await connection.execute(statement, [id, userId])
    }
}

module.exports = new articleDB()