/**
 * CopyRight Samphay.
 * 2018/4/17
 */
"use strict";
/**
 *
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) { //author: meizz
    if (!fmt) fmt = 'yyyy-MM-dd';
    const week = [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
    ];
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "W+": week[this.getDay()],
        "i+": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o){
        if(o.hasOwnProperty(k)){
            if (new RegExp("(" + k + ")").test(fmt)){
                let _o = "0";
                for(let i = 1; i<RegExp.$1.length; i++){
                    _o = _o+"0";
                }
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                    ( o[k] ) :
                    ((_o + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
};
String.prototype.reDLBrace = function (data) {
    let reg = new RegExp("\\{{([^\\[\\]]*?)\\}}", 'igm');
    return this.replace(reg, function (i, k) {
        return data[k]
    })
};