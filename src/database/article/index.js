const connection = require("../index")

class articleDB {
    async addArticle({ title, cate_id, content, cover_img, state, author_id }, positive_prob, neutral_prob, negative_prob) {
        console.log(content)
        const statement = `insert into article (title,cate_id,content,cover_img,state,author_id,positive_prob, neutral_prob, negative_prob) 
                            values (?,?,?,?,?,?,?,?,?);`
        await connection.execute(statement, [title, cate_id, content, cover_img, state, author_id, positive_prob, neutral_prob, negative_prob])
    }

    //得到日志详情
    async getArticleDB(id) {
        const statement = `
        select a.id,title,content,cover_img,pub_date,state,
        cate_id,author_id,cate_name,username,nickname from article a left join users u 
        on a.author_id=u.id left join category c on cate_id=c.id where a.id=?; 
        `
        const [value] = await connection.execute(statement, [id])
        return value[0]
    }

    //得到日志列表
    async getArticleListDB({ cate_id, userId, state, pagesize, pagenum }) {

        if (state && cate_id) {
            const statement = `
        select a.id,title,pub_date,state,cate_name,positive_prob,neutral_prob,negative_prob from article a left join category c 
        on a.cate_id=c.id where author_id=? and cate_id=? and state=? limit ? offset ?;
        `
            const s1 = `
        select count(*) total from article a left join category c 
        on a.cate_id=c.id where author_id=? and cate_id=? and state=?;
        `
            const [v1] = await connection.execute(s1, [userId, cate_id, state])
            const [value] = await connection.execute(statement, [userId, cate_id, state, pagesize, pagenum])
            return [value, v1[0]]
        }
        else if (!state && !cate_id) {

            const statement = `
        select a.id,title,pub_date,state,cate_name,positive_prob,neutral_prob,negative_prob from article a left join category c 
        on a.cate_id=c.id where author_id=? limit ? offset ?;
        `
            const s1 = `
        select count(*) total from article a left join category c 
        on a.cate_id=c.id where author_id=? ;
        `
            const [v1] = await connection.execute(s1, [userId])

            const [value] = await connection.execute(statement, [userId, pagesize, pagenum])
            return [value, v1[0]]
        }
        else if (!state) {
            const statement = `
        select a.id,title,pub_date,state,cate_name,positive_prob,neutral_prob,negative_prob from article a left join category c 
        on a.cate_id=c.id where author_id=? and cate_id=?  limit ? offset ?;
        `
            const s1 = `
        select count(*) total from article a left join category c 
        on a.cate_id=c.id where author_id=? and cate_id=?;
        `
            const [v1] = await connection.execute(s1, [userId, cate_id])
            const [value] = await connection.execute(statement, [userId, cate_id, pagesize, pagenum])
            return [value, v1[0]]
        }

        const statement = `
        select a.id,title,pub_date,state,cate_name,positive_prob,neutral_prob,negative_prob from article a left join category c 
        on a.cate_id=c.id where author_id=?  and state=? limit ? offset ?;
        `
        const s1 = `
        select count(*) total from article a left join category c 
        on a.cate_id=c.id where author_id=? and state=?;
        `
        const [v1] = await connection.execute(s1, [userId, state])
        const [value] = await connection.execute(statement, [userId, state, pagesize, pagenum])
        return [value, v1[0]]

    }

    //查找用户的日志是否存在
    async findArticleDB(id, userId) {
        const statement = "select * from article where id=? and author_id=?;"
        const [value] = await connection.execute(statement, [id, userId])
        return value.length
    }

    //删除日志
    async deleteArticleDB(id, userId) {
        const statement = "delete from article where id=? and author_id=?;"
        await connection.execute(statement, [id, userId])
    }

    //查找所有日志数量
    async getAllArticleNumDB(userId) {
        const statement = "select * from article where author_id=?;"
        const [value] = await connection.execute(statement, [userId])
        return value.length
    }

    //查找日增日志数量
    async getNewArticleNumDB(userId, date) {
        const currentTime = date + '%'
        const statement = `select * from article where author_id=? and pub_date like ?`
        const [value] = await connection.execute(statement, [userId, currentTime])
        return value.length
    }

    //查找分类日志数量
    async getCateArticleDB(userId) {
        const statement = `select cate_name,count(*) count from article a left join category c on a.cate_id=c.id 
        where author_id=? group by a.cate_id;`
        const [value] = await connection.execute(statement, [userId])
        return value
    }

    async getMonthNumDB(userId, month, month1, month2, month3, month4, month5) {

        const statement = `
        select count(*) count from article a left join category c 
        on a.cate_id=c.id where author_id=? and pub_date like ? ;
        `
        const [value] = await connection.execute(statement, [userId, month + "%"])
        const [value1] = await connection.execute(statement, [userId, month1 + "%"])
        const [value2] = await connection.execute(statement, [userId, month2 + "%"])
        const [value3] = await connection.execute(statement, [userId, month3 + "%"])
        const [value4] = await connection.execute(statement, [userId, month4 + "%"])
        const [value5] = await connection.execute(statement, [userId, month5 + "%"])

        const result = [
            { date: month, count: value[0].count },
            { date: month1, count: value1[0].count },
            { date: month2, count: value2[0].count },
            { date: month3, count: value3[0].count },
            { date: month4, count: value4[0].count },
            { date: month5, count: value5[0].count },
        ]
        return result
    }

    async getHumorNumDB(userId) {
        const statement = `select count(*) positiveNum  from article where  positive_prob>0.9 and author_id=?;`
        const s1 = `select count(*) negativeNum  from article where  negative_prob>0.9 and author_id=?;`
        const s2 = `select count(*) commonNum from article where  positive_prob<0.9 and negative_prob<0.9 and author_id=? ; `
        const [value] = await connection.execute(statement, [userId])
        const [value1] = await connection.execute(s1, [userId])
        const [value2] = await connection.execute(s2, [userId])
        return { ...value[0], ...value1[0], ...value2[0] }
    }
}

module.exports = new articleDB()