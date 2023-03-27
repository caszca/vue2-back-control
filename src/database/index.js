const mysql = require("mysql2")
const { SERVER_HOST } = require("@/config/server.js")
const connectionPool = mysql.createPool({
    host: SERVER_HOST,
    port: "3306",
    database: "vue-event",
    connectionLimit: 10,
    user: "root",
    password: "root"
})

connectionPool.getConnection((err, connection) => {
    if (err) {
        console.log("数据库连接失败")
        return
    }
})

const connection = connectionPool.promise()
module.exports = connection