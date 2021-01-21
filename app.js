const express = require('express');
const app = express();
const path = require('path');

// 导入返回结果信息
const {delsucc,delfail,exception,argsfail} = require("./util/responseMessage.js")

// 连接数据库参数配置
const dbqueyr = require("./util/dbquery.js");

// 自己抽出来 congIig 导入收据库的配置
let dbConfig = require("./config/db.json")

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// //配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 

//使用模板引擎扩展名为html
app.set('view engine', 'html');

// 托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/index',(req,res) => {
    // res.sendFile(path.join(__dirname,'/views/index manage.html'));
    res.render('category-index.html')
})

app.get('/add',(req,res) => {
    // res.sendFile(path.join(__dirname,'/views/index manage.html'));
    res.render('article-add.html')
})

// 渲染后台分类列表页面
app.get('/del',(req,res) => {
    // res.sendFile(path.join(__dirname,'/views/index manage.html'));
    res.render('article-index.html')
})

// 获取分类数据的接口
app.get("/getCate", async (req,res) => {
    // 1.查询数据库 
    let sql = "select * from category order by sort";
    let data = await dbqueyr(sql);
    res.json(data);
})

// 删除数据的接口
app.post("/delCat",async (req,res) => {
    let {cat_id} = req.body;
    if(!cat_id) {
        res.json(argsfail)
    } else {
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`;
        // connection.query(sql,(err,rows) => {
        //     if(rows.affectedRows){
        //         res.json({errcode:'0','message':'删除成功'})
        //     } else {
        //         res.json({errcode:'10002','message':'删除失败'})
        //     }
        // })
        let result;
        try{
            result = await dbqueyr(sql);
            if(result.affectedRows) {
                res.json(delsucc)
            } else {
                res.json(exception)
            }
        } catch(e){
            res.json(exception)
        }
        
    }
})

app.listen(6732,() => console.log('sesrver is runing ar port 6723'));