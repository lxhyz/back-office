// 连接数据库参数配置 导入model 执行sql语句
const model = require("../model/model.js");

// 导入返回结果信息
const {delsucc,delfail,exception,argsfail,successAdd,defeAdd,updfail,updsucc} 
        = require("../util/responseMessage.js")

// 分类控制器

let CateController = {};


// 熏染后台分类列表页面
CateController.index = (req, res) => {
    // res.sendFile(path.join(__dirname,'/views/index manage.html'));
    res.render('category-index.html')
},

// 获取分类接口
CateController.add = (req, res) => {
    // res.sendFile(path.join(__dirname,'/views/index manage.html'));
    res.render('article-add.html')
}

// 删除分类
CateController.del = (req, res) => {
    // res.sendFile(path.join(__dirname,'/views/index manage.html'));
    res.render('article-index.html')
}

// 获取分类数据的接口
CateController.getCate = async (req, res) => {
    // 1.查询数据库 
    let sql = "select * from category order by sort desc";
    let data = await model(sql);
    res.json(data);
}

// 获取单条分类数据(
CateController.getOnecate = async (req,res) => {
     // 1.接收参数
     let {cat_id} = req.query;
     if(!cat_id) {
         res.json(argsfail)
     } else {
        // 2.查询数据库 
        let sql = `select * from category where cat_id = ${cat_id}`;
        let data = await model(sql);
        // 3.返回数据
        if(data.length) {
            data[0].errcode = 0;
            res.json(data[0]);
        }else {
            res.json(defeAdd);
        }
        
     }
      
}

// 删除数据的接口
CateController.delCat = async (req, res) => {
    let { cat_id } = req.body;
    if (!cat_id) {
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
        try {
            result = await model(sql);
            if (result.affectedRows) {
                res.json(delsucc)
            } else {
                res.json(exception)
            }
        } catch (e) {
            res.json(exception)
        }

    }
}

// 展示添加分类页面
CateController.catadd =(req,res) => {
    res.render('category-add.html');
}

CateController.catindex =(req,res) => {
    res.render('category-index.html');
}

// 添加数据
CateController.postCat = async (req,res) => {
    // 1. 接收参数
    let {name,sort,add_date} = req.body;
    // 2.  写入数据库                                          字符串要加引号
    let sql = `insert into category(name,sort,add_date) values('${name}','${sort}','${add_date}')`
    let result = await model(sql);  // 查询返回的是数组
    if(result.affectedRows) {
        // 成功
        //data[0].errcode = 0;
        res.json(updfail)
    } else {
        // 失败
        res.json(updfail)
    }
    // 3. 渲染到页面

}

// 展示编辑分类页面
CateController.catedit =(req,res) => {
    res.render('category-edit.html');
}

// 实现分类数据的编辑入库
CateController.updCate = async (req,res) => {
    // 1.接收参数
    let {cat_id,name,sort,add_date} = req.body;
    if(!cat_id) {
        res.json(delfail)
        return;
    }
    // 2.编写sql
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}'
        where cat_id = ${cat_id}`;
    let result = await model(sql);
    // 3.返回结果
    if(result.affectedRows) {
        res.json(updsucc)
    } else {
        res.json(updfail)
    }
}


module.exports = CateController;