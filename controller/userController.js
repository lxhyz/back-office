// 用户控制器
let userController = {};

// 连接数据库参数配置 导入model 执行sql语句
const model = require("../model/model.js");
const md5 = require('md5');
const {secret : passwordS} = require("../config/app.json")

// 登录接口
userController.signin = async (req,res) => {
    // 1.接收参数
    let {username,password} = req.body;
    console.log(username,passwordS)
    // 2.编写数据库查询
    password = md5(password + passwordS);
    let sql = `select * from users where username = '${username}' and password = '${password}'`
    let data = await model(sql);
    console.log(data);
    // 3.相应结果 
    if(data.length) {
        // 匹配成功 
        // 1.把用户信息存入到会话session中，
        let userInfo = data[0];
        req.session.userInfo = userInfo;
        // 2.更新此次的登陆时间
        res.json({errcode:0,message:"登陆成功"});
    } else {
        // 匹配失败
        res.json({errcode:10008,message:"用户名或密码错误"})
    }
    
}

module.exports = userController;