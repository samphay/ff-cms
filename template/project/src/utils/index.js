/**
 * Created by renzhiqiang on 17/6/12.
 */
import config from './config'
import {notification, Modal} from 'antd'

// import mockStorge from './mockStorge'
// require('./mock.js') //如果不使用mock模拟API将该行代码屏蔽掉

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
};
// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, "-$1").toLowerCase()
};
// 时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

// 数据容量单位转换
Number.prototype.bytesToSize = function () {
  if (this === 0) return '0 b';
  let k = 1024, // or 1024
    sizes = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'],
    i = Math.floor(Math.log(this) / Math.log(k));
  return (this / Math.pow(k, i)).toPrecision(3) + sizes[i];
};

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    'H+': this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length))
  return format
};

//全局列表分页参数
window.queryApiInitPageSize = 10;
const parseParams = (data) => {
  let params = '';

  if (data) {
    for (var o in data) {
      if (data[o] !== null && data[o] !== undefined && data[o] !== '') {

        if (typeof data[o] === 'object' && data[o] instanceof Array && data[o].length > 0) {
          if (typeof data[o][0] === 'object') {
            params += (o + '=' + JSON.stringify(data[o]) + '&')
          } else {
            for (var i = 0; i < data[o].length; i++) {
              params += (o + '=' + data[o][i] + '&')
            }
          }
        } else {
          params += (o + '=' + data[o] + '&')
        }
      }
    }
  }

  if (params.length > 0) {
    params = params.substr(0, params.length - 1);
    //params = '?'+params+'_dc='+Math.random();
  }
  /*else{
   params = '?_dc='+Math.random();
   }*/
  return decodeURI(params);
};
const openNotice = (type, message, desc) => {
  notification[type]({
    message: message,
    description: desc,
  });
};
const openModal1 = (type, title, msg) => {
  Modal[type]({
    title: title,
    content: msg,
    okText: '关闭'
  });
};
const openModal = (text,opt,type) => {
  type = type || "info";
  Modal[type](Object.assign({
    content:text
  },opt));
};

const str2json = (str) => {
  let t = null;
  try {
    t = JSON.parse(str);
  } catch (e) {
    t = eval("(" + str + ')');
  } finally {
    return t;
  }
};
const isNull = (x) => {
  if (x === null || x === undefined || x === '') {
    return true;
  }
  return false;
};
const formatMoney = (num) => {//带千分位的整数
  var num = (num || 0).toString()
    , result = ''
    , dec = ''
    , temp = '';
  if (num.match('.')) {
    var t = num.split('.');
    num = t[0];
    if (t.length > 1)
      dec = t[1];
  }
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  while (dec.length > 3) {
    temp = dec.slice(0, 3) + ',' + temp;
    dec = dec.slice(3);
  }
  if (dec) {
    temp = temp + dec;
  } else {
    if (temp)
      temp = temp.slice(0, temp.length - 2);
  }
  return ( dec ? (result + '.' + temp) : result);
};
function paramSny(params) {
  var pars = "&";
  for (var name in params) {
    pars += name + "=" + params[name]+ "&";
  }
  return pars;
}
function obj2params(obj) {
  var result = '';
  var item;
  for (item in obj) {
    if(typeof obj[item] === 'object') {
      result += '&' + item + '=' + encodeURIComponent(JSON.stringify(obj[item]));
    }else {
      result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

  }
  if (result) {
    result = result.slice(1);
  }
  return result;
}
function adpterkeyValue(data) { // 业务预警
  var panes = [];
  for(var val in  data){
    var obj = {};
    obj.key= val;
    obj.value=data[val];
    panes.push(obj);
  }
 return panes
}
function adpterData(data) { // 业务预警
  data.sort(function (a,b) {
    return a.maxExpectancySuccessCount>b.maxExpectancySuccessCount
  });
  let maxExe= data[data.length-1].maxExpectancySuccessCount;
  data.sort(function (a,b) {
    return a.successCount>b.successCount
  });
  let MaxSuccess= data[data.length-1].successCount;
  let max = Math.max(maxExe,MaxSuccess)+10;
  data.map(function (datas) {
    if(datas.maxExpectancySuccessCount=='-1'){
      datas.maxExpectancySuccessCount= max;
    }
    return datas
  });
  return data
}

//json 格式化工具
function formatJson(json, options) {

  //add by mjjhuang  修复全部是数字时可以转化为json的漏洞
  /*-----begin--------*/
  if(/^\d+$/.test(json.replace(/(^\s*)|(\s*$)/g, ""))) {
    throw new error("is not a json data");
  }
  /*-----end--------*/

  var reg = null,
    formatted = '',
    pad = 0,
    PADDING = '    '; // one can also use '\t' or a different number of spaces

  // optional settings
  options = options || {};
  // remove newline where '{' or '[' follows ':'
  options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
  // use a space after a colon
  options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

  // begin formatting...
  if (typeof json !== 'string') {
    // make sure we start with the JSON as a string
    json = JSON.stringify(jsonResult);
  } else {
    // is already a string, so parse and re-stringify in order to remove extra whitespace
    json = JSON.parse(json);
    json = JSON.stringify(json);
  }

  // add newline before and after curly braces
  reg = /([\{\}])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline before and after square brackets
  reg = /([\[\]])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline after comma
  reg = /(\,)/g;
  json = json.replace(reg, '$1\r\n');

  // remove multiple newlines
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, '\r\n');

  // remove newlines before commas
  reg = /\r\n\,/g;
  json = json.replace(reg, ',');

  // optional formatting...
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ':{');
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ':[');
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ':');
  }
  json.split('\r\n').forEach(function (node,index) {
    var i = 0,
      indent = 0,
      padding = '';

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }

    formatted += padding + node + '\r\n';
    pad += indent;
  });
  return formatted;
};
//获取当前时间戳
function getTime() {
 return new Date(new Date().getFullYear()+ '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() +' ' + new Date().getHours()+':'+new Date().getMinutes()+":00")
}

export default {
  adpterkeyValue,
  adpterData,
  getTime,
  paramSny,
  config,
  formatJson,
  obj2params,
  isNull,
  str2json,
  openModal,
  openNotice,
  parseParams,
  formatMoney
}
