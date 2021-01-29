let artController = {};

const fs = require('fs');

// 连接数据库参数配置 导入model 执行sql语句
const model = require("../model/model.js");


// 导入获取文章(mock)模拟假数据
let articleData = require("../mockData/article.json")

// 导入返回结果信息
const { delsucc, delfail, exception, argsfail, successAdd, defeAdd, updfail, updsucc }
    = require("../util/responseMessage.js")

// 获取分页的文章数据
artController.allarticle = async (req, res) => {
    // 1.接收查询字符串
    let { page, limit: pagesize } = req.query;
    // 2.编写sql语句
    let offest = (page - 1) * pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id 
                = t2.cat_id order by art_id desc limit ${offest},${pagesize}`;
    let sql2 = `select count(*) as count from article`;
    let promise1 = model(sql);
    let promise2 = model(sql2);
    let result = await Promise.all([promise1, promise2]);  // 改为并行
    let data = result[0];  // 拿到数据
    let count = result[1][0].count;  // 拿到数据总记录数
    let reponse = {
        code: 0,
        count: count,
        data: data,
        msg: ''
    }
    res.json(reponse);
}

// 删除文章
artController.delArticle = async (req, res) => {
    let { art_id } = req.body;
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if (result.affectedRows) {
        res.json(delsucc);
    } else {
        res.json(delfail);
    }
}

// 渲染出文章编辑页面 
artController.artedit = (req, res) => {
    res.render("article-edit.html");
}

// 渲染出添加文章的页面
artController.addart = (req, res) => {
    res.render("article-add.html");
}

// 提交文章的数据入库
artController.postArt = async (req, res) => {
    let { title, cat_id, status, content,cover} = req.body;
    let sql = `insert into article(title,content,cat_id,status,cover,publish_date)
                values('${title}','${content}',${cat_id},${status},'${cover}',now())
                `;
    let result = await model(sql);
    if (result.affectedRows) {
        res.json(successAdd)
    } else {
        res.json(defeAdd)
    }
}

// 上传图片的接口
artController.upload = (req, res) => {
        if (req.file) {
            // 进行文件的重命名即可 fs.rename
            let { originalname, destination, filename } = req.file;
            let dotIndex = originalname.lastIndexOf('.');
            let ext = originalname.substring(dotIndex);
            let oldPath = `${destination}${filename}`;
            let newPath = `${destination}${filename}${ext}`;
            fs.rename(oldPath, newPath, err => {
                if (err) { throw err; }
                res.json({ code: 0, message:'上传文件成功',src: newPath })
            })
        } else {
            res.json({ code:1,message: '上传文件失败' })
        }
}

module.exports = artController;