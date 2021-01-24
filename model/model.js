// 封装执行sql 语句的promise函数

const mysql = require('mysql');

// 导入数据库参数
let dbConfig = require("../config/db.json")

// 连接数据库的配置参数
var connection = mysql.createConnection({
    ...dbConfig // 展开参数对象
    
});

// 连接mysql
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});

// connection.query(sql,(err,rows) => {
//     if(err) { throw err };
//     // 2.返回数据
//     res.json(rows);
// })

function dbquery(sql){
    return new Promise((reslove,reject) => {
        connection.query(sql,(err,rows) => {
            if(err) { reject(err) };
            // 2.返回数据
            // select(查询) => data 是一个数组 rows.length > 0 说明有数据
            // insert delete updata （增删改）=> data 是一个对象 data.affectedRows >0 说明成功
            reslove(rows);
        })
    })
}


// 暴露模块内容
module.exports = dbquery;
