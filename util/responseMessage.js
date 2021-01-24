const reponseMessage = {
    delsucc: {errcode:0,'message':'删除成功'},
    delfail: {errcode:10001,'message':'原因为止，请重新尝试'},
    exception: {errcode:10002,'message':'删除失败'},
    argsfail: {errcode:10003,'message':'参数失败'},
    successAdd:{errcode:10004,'message':'添加成功'},
    defeAdd:{errcode:10005,'message':'添加失败'},
    updsucc:{errcode:10006,'message':'编辑成功'},
    updfail:{errcode:10007,'message':'编辑失败'},
}
module.exports = reponseMessage;
