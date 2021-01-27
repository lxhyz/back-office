const express = require('express');



//导入响应的控制器
const cateConterller = require("../controller/cateController.js");
const artController = require("../controller/artController")

// 得到一个路由
let router = express.Router();



router.get('/index', cateConterller.index)

router.get('/add', cateConterller.add)

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

// 获取单条数据
router.get("/getOnecate",cateConterller.getOnecate);

// 编辑分类的接口
router.post('/updCate',cateConterller.updCate);


//  获取文章数据的接口
router.get("/allarticle",artController.allarticle);

//  删除文章
router.post("/delArticle",artController.delArticle);

module.exports = router;