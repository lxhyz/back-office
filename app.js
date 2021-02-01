const express = require('express');
const app = express();
const path = require('path');
// 引入session会话技术
let session = require("express-session");

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

// 初始化session,定义session一些配置
let options = {
    name:"SESSIONID", // 待会写入到cookie中标识
    secret: "FGVH$#E%&", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        maxAge:60000*24, // session在cookies存活24分钟，
        // 再次访问，时间重置为24分钟， 24分钟内只要不访问则会失效
    }
};
app.use( session(options) )

// 使用路由中间件
app.use(router);

app.listen(6732,() => console.log('sesrver is runing ar port 6723'));