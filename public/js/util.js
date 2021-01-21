// 这里定义一些 工具函数
(function(window,undefined) {
    let util = {
        date_format:function(date,format ='YYYY-MM-DD HH:mm:ss'){
            return moment(date).format(format);
        }
    }
    //暴露给全局
    window.util = util;
})(window)
