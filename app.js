const express = require('express');
const app = express();
const path = require('path');

// 导入路由模块
const router = require("./router/router.js")


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

// 图片静态资源
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// 使用路由中间件
app.use(router);

app.listen(6732,() => console.log('sesrver is runing ar port 6723'));