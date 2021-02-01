const express = require('express');
const multer = require('multer');

var upload = multer({ dest: 'uploads/' })

//导入响应的控制器
const cateConterller = require("../controller/cateController.js");
const artController = require("../controller/artController");
const userController = require("../controller/userController");

// 得到一个路由
let router = express.Router();



router.get('/index', cateConterller.index)

router.get('/add', cateConterller.add)

// 匹配 / 或者 /del
router.get(/^\/$|^\/del$/,(req,res) => {
    console.log(req.session.userInfo);
    let data = {
        userInfo:req.session.userInfo,
    }
    res.render("article-index.html",data)
})

// 渲染后台分类列表页面
router.get('/del', cateConterller.del)

// 获取分类数据的接口
router.get("/getCate", cateConterller.getCate)

// 删除数据的接口
router.post("/delCat", cateConterller.delCat)

// 添加数据
router.get('/catindex',cateConterller.catindex);

// 渲染出添加分类的后台
router.get('/catadd',cateConterller.catadd);

// 渲染出编辑的页面
router.get("/catedit",cateConterller.catedit);

// 提交分类的数据
router.post("/postCat",cateConterller.postCat);

// 获取单条分类数据
router.get("/getOnecate",cateConterller.getOnecate);

// 编辑分类的接口
router.post('/updCate',cateConterller.updCate);

//  获取文章数据的接口
router.get("/allarticle",artController.allarticle);

//  删除文章
router.post("/delArticle",artController.delArticle);

// 渲染出编辑文章的页面
router.get("/artedit",artController.artedit);

// 渲染出添加文章的页面
router.get("/addart",artController.addart);

// 提交文章的数据入库
router.post("/postArt",artController.postArt);

// 上传文件接口
router.post("/upload",upload.single('file'),artController.upload);

// 修稿文章的状态
router.post("/updStatus",artController.updStatus);

// 获取单条文章数据的接口
router.get("/getOneArt",artController.getOneArt);

// 编辑文章数据接口
router.post("/updArts",artController.updArts);

// 熏染用户登录页面
router.get("/login",(req,res) => {
     // 如果有用户信息 用户再次/login，则直接帮他重定向到首页
     if(req.session.userInfo) {
        res.redirect("/");
        return
    }
    res.render("login.html");
});

// 用户登录
router.post("/signin",userController.signin);

// 用户退出
router.get("/logout",(req,res) => {
    req.session.destroy(err => {
        if(err){throw err;}  // 清除session
    })
    res.redirect("/login")  // res.redirect 重定向
});

module.exports = router;