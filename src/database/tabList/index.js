const connection = require("../index")
class tabListDB {
    async getTabList() {
        const statement = `select f.indexPath indexPath,f.title title,f.icon icon,
        json_arrayagg(json_object('indexPath',s.indexPath, 'title',s.title,'icon',s.icon)) 
        children from firstTabList f left join secondTabList s on f.id=s.parentId group by f.id;`
        const [value] = await connection.execute(statement)
        return value
    }
}

module.exports = new tabListDB()


