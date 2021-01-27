let artController = {};

// 连接数据库参数配置 导入model 执行sql语句
const model = require("../model/model.js");


// 导入获取文章(mock)模拟假数据
let articleData = require("../mockData/article.json")

// 导入返回结果信息
const {delsucc,delfail,exception,argsfail,successAdd,defeAdd,updfail,updsucc} 
        = require("../util/responseMessage.js")

// 获取分页的文章数据
artController.allarticle = async (req,res) => {
    // 1.接收查询字符串
    let {page,limit:pagesize} = req.query;
    // 2.编写sql语句
    let offest = (page -1)*pagesize;
    let sql = `select * from article limit ${offest},${pagesize}`;
    let sql2 = `select count(*) as count from article`;
    let promise1 = model(sql);
    let promise2 = model(sql2);
    let result = await Promise.all([promise1,promise2]);  // 改为并行
    let data = result[0];  // 拿到数据
    let count = result[1][0].count;  // 拿到数据总记录数
    let reponse = {
        code: 0,
        count: count,   
        data:data,
        msg: ''
    }
    res.json(reponse);
}

// 删除文章
artController.delArticle = async (req,res) => {
    let {art_id} = req.body;
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows) {
        res.json(delsucc);
    } else {
        res.json(delfail);
    }
}

module.exports = artController;