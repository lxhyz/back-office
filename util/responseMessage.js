const reponseMessage = {
    delsucc: {errcode:0,'message':'删除成功'},
    delfail: {errcode:10001,'message':'原因为止，请重新尝试'},
    exception: {errcode:10002,'message':'删除失败'},
    argsfail: {errcode:10003,'message':'参数失败'}
}
module.exports = reponseMessage;
