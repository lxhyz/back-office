const express = require('express');
const path = require('path');
const app = express();


var mysql = require('mysql'); 

//连接数据库参数配置
var connection = mysql.createConnection({
    host    :"localhost", //主机
    port    :'3306',	//端口
    user    :"root",	//用户名
    password:"123456",	//密码
    database:"article2001"		//数据库
});
//连接mysql
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 定义中间件，托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

//配置模板的路径
app.set('views', __dirname + '/views/');

//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template); 

//使用模板引擎扩展名为html
app.set('view engine', 'html');

// 匹配 / 或 /admin
app.get(/^\/$|^\/admin$/,(req,res)=>{
    // res.sendFile( path.join(__dirname,'views/index.html') )
    res.render('index.html')
})
// app.get('/',(req,res)=>{
//     // 重定向到 /admin
//     res.redirect('/admin')
// })

// app.get('/admin',(req,res)=>{
//     res.sendFile( path.join(__dirname,'views/index.html') )
// })

app.get('/artindex',(req,res)=>{

    // res.sendFile( path.join(__dirname,'views/article-index.html') )
    res.render('article-index.html')
})

// 渲染后台分类列表页面
app.get('/catindex',(req,res)=>{

    // res.sendFile( path.join(__dirname,'views/article-index.html') )
    res.render('category-index.html')
})

app.get('/artadd',(req,res)=>{
    // res.sendFile( path.join(__dirname,'views/article-add.html') )
    res.render('article-add.html')
})


// 获取分类数据的接口
app.get('/getCate',(req,res)=>{
    // 1.查询数据库
    let sql = "select * from category order by sort"
    connection.query(sql,(err,rows)=>{
        if(err){ throw err; }
        res.json(rows)
    })
    // 2.返回数据
})

// 删除分类的接口
app.post('/delCat',(req,res)=>{
    let {cat_id} = req.body;

    // 判断参数
    if(!cat_id){
        res.json({errcode:10001,'message':"参数有误"})
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`
        connection.query(sql,(err,result)=>{
            if(result.affectedRows){
                res.json({errcode:0,'message':"删除成功"})
            }else{
                res.json({errcode:10002,'message':"服务器繁忙，请稍后再试"})
            }
        })
    }
})

app.listen(4000,_=>console.log('server is running at port 4000'))