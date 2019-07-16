```
/**
 * js-cookie操作
 */

define([], function () {
  return {
    // 设置cookie
    setCookie: function (cname, cvalue, maxAge) {
      document.cookie = cname + '=' + cvalue + ';max-age=' + maxAge + ';';
    },
    // 获取cookie
    getCookie: function (cname) {
      var name = cname + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i += 1) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  }
});
```
```
/**
 * @file 数据转换方法集合.
 * @desc 已有方法：1.数据处理formatNum; 2.颜色处理colorDeal; 3.数据初始化处理initializaData; 4.日期转换格式formatDate
 * 相关函数：1.金额千分位格式化函数formatMoney
 */
define([], function () {
  /**
   * 金额千分位格式化函数.
   * @param {Number} val - 需要进行金额千分位的数值;
   * @param {Number} metric - 计量单位数值;
   */
  var formatMoney = function (val, metric) {
    if (val == '--') {
      return val;
    }
    if ((val != 0 && !val) || val === '') {
      return '--';
    }
    //将金额精确到两位小数
    val = (parseFloat(val) / metric).toFixed(2).toString();
    //从小数点处分割
    var vals = val.split('.');
    //定义需要格式化的部分
    var pren = vals[0];
    //小数位
    var post = vals[1];
    //千分位
    var count = 0;
    var result = '';
    for (var i = pren.length - 1; i >= 0; i--) {
      count++;
      result = pren.charAt(i) + result;
      if (!(count % 3) && (i != 0 & pren.charAt(i - 1) != '-')) {
        result = ',' + result;
      }
    }
    return result + '.' + post;
  };
  var formatData = {
    /**
     * 数据处理   1、字符串   2、金额千分位  3、百分比  4、保留两位小数
     * @param {Object} val - 需转化的数据
     * @param {Number} type - 需要进行的转化操作
     * @param {Number} metric - 计量单位数值
     * @returns {Object} 
     */
    formatNum: function (val, type, metric) {
      //非值处理
      if (val == '--' || (val != 0 && !val) || val === '') {
        return '--';
      }

      var ret = '';
      switch (type) {
        case 1:
          ret = val;
          break;
        case 2:
          ret = formatMoney(val, metric);
          break;
        case 3:
          ret = (val * 100).toFixed(2) + '%';
          break;

        default:
          break;
      }
      return ret;
    },

    /**
     * 颜色处理，判断数字大于零或小于零.
     * @param {Number} val - 数字
     * @returns {Boolean}
     */
    colorDeal: function (val) {
      if (val >= 0 || val === '--') {
        return true;
      } else {
        return false;
      }
    },

    /**
     * 数据初始化处理，将对象或数组中所有数据初始化为'--'.
     * @param {Array, Object} val - 对象或数组或两者兼有
     */
    initializaData: function (val) {
      if (val instanceof Array) {
        var valLen = val.length;
        for (var i = 0; i < valLen; i++) {
          if (val[i] instanceof Array || val[i] instanceof Object) {
            this.initializaData(val[i]);
          } else {
            val[i] = '--';
          }
        }
      } else if (val instanceof Object) {
        for (var key in val) {
          if (val.hasOwnProperty(key)) {
            if (val[key] instanceof Array || val[key] instanceof Object) {
              this.initializaData(val[key]);
            } else {
              val[key] = '--';
            }
          }
        }
      }
    },

    /**
     * 日期格式化
     * @param {Date} date - 需要转换的时间
     * @param {String} formatStr - 需要获取的日期格式
     * @returns {String} 
     */
    formatDate: function (date, formatStr) {
      var fmt = "";
      if (!formatStr) {
        fmt = 'YYYY-MM-dd HH:mm:ss';
      } else {
        fmt = formatStr;
      }
      var hour = date.getHours();
      var map = {
        '[Mm]+': date.getMonth() + 1, // 月份
        '[Dd]+': date.getDate(), // 日
        'H+': hour, // 小时
        'h+': hour % 12 || 12, // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
        a: hour >= 12 ? 'pm' : 'am',
        A: hour >= 12 ? 'PM' : 'AM',
      };
      var str = fmt.replace(/[Yy]+/g, JSON.stringify(date.getFullYear()));
      Object.keys(map).forEach(function (key) {
        var value = map[key].toString();
        var replaceStr = (str.length === 1 ? value : ("00" + value).slice(value.length));
        str = str.replace(new RegExp(key), replaceStr);
      });
      return str;
    },

    /**
     * 获取本日初时间戳
     * 
     * @param {String} now - 当前时间
     */
    getBeginOfToday: function (now) {
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setSeconds(0);
        return nowDate.valueOf();
      }
      return now;
    },

    /**
     * 获取本日初时间字符
     * 
     * @param {String} now - 当前时间
     * @param {String} format - 格式化字符
     */
    getBeginOfTodayStr: function (now, format) {
      var formatStr = format ? format : 'YYYY/MM/dd';
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        return this.formatDate(new Date(now), formatStr) + " 00:00:00";
      }
      return now;
    },

    /**
     * 获取本日末时间戳
     * 
     * @param {String} now - 当前时间
     */
    getEndOfToday: function (now) {
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Data(now);
        nowDate.setHours(23);
        nowDate.setMinutes(59);
        nowDate.setSeconds(59);
        return nowDate.valueOf();
      }
      return now;
    },

    /**
     * 获取本日末时间字符
     * 
     * @param {String} now - 当前时间
     * @param {String} format - 格式化字符
     */
    getEndOfTodayStr: function (now, format) {
      var formatStr = format ? format : 'YYYY/MM/dd';
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        return this.formatDate(new Date(now), formatStr) + " 23:59:59";
      }
      return now;
    },

    /**
     * 获取本月初时间戳
     * 
     * @param {String} now - 当前时间
     */
    getBeginOfMonth: function (now) {
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var beginOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
        beginOfMonth.setHours(0);
        beginOfMonth.setMinutes(0);
        beginOfMonth.setSeconds(0);
        return beginOfMonth.valueOf();
      }
      return now;
    },

    /**
     * 获取本月初时间字符
     * 
     * @param {String} now - 当前时间
     * @param {String} format - 格式化字符
     */
    getBeginOfMonthStr: function (now, format) {
      var formatStr = format ? format : 'YYYY/MM/dd';
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var beginOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
        return this.formatDate(beginOfMonth, formatStr) + " 00:00:00";
      }
      return now;
    },

    /**
     * 获取本年初时间戳
     * 
     * @param {String} now - 当前时间
     */
    getBeginOfToYear: function (now) {
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        // 时间类型
        var timeStr = new Date(now).getFullYear() + "-01-01 00:00:00";
        return new Date(timeStr).valueOf();
      }
      return now;
    },

    /**
     * 获取本年初时间字符
     * 
     * @param {String} now - 当前时间
     * @param {String} format - 格式化字符
     */
    getBeginOfToYearStr: function (now, format) {
      var formatStr = format ? format : 'YYYY/MM/dd';
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var newDate = new Date(nowDate.getFullYear() + "-01-01");
        return this.formatDate(newDate, formatStr) + " 00:00:00";
      }
      return now;
    },

    /**
     * 获取本月末时间戳
     * @param {String} now - 当前时间
     */
    getEndOfMonth: function (now) {
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var endOfMonth = new Date(nowDate.getFullYear(), (nowDate.getMonth() + 1), 0);
        endOfMonth.setHours(23);
        endOfMonth.setMinutes(59);
        endOfMonth.setSeconds(59);
        return endOfMonth.valueOf();
      }
      return now;
    },

    /**
     * 获取本月末时间字符
     * @param {String} now - 当前时间
     * @param {String} format - 格式化字符
     */
    getEndOfMonthStr: function (now, format) {
      var formatStr = format ? format : 'YYYY/MM/dd';
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var endOfMonth = new Date(nowDate.getFullYear(), (nowDate.getMonth() + 1), 0);
        return this.formatDate(endOfMonth, formatStr) + " 23:59:59";
      }
      return now;
    },

    /**
     * 获取上月末时间戳
     * @param {String} now - 当前时间
     */
    getEndOfLastMonth: function (now) {
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var lastendMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        lastendMonth.setHours(23);
        lastendMonth.setMinutes(59);
        lastendMonth.setSeconds(59);
        return lastendMonth.valueOf();
      }
      return now;
    },

    /**
     * 获取上月末时间字符
     * @param {String} now - 当前时间
     * @param {String} format - 格式化字符
     */
    getEndOfLastMonthStr: function (now, format) {
      var formatStr = format ? format : 'YYYY/MM/dd';
      if (isNaN(now) && !isNaN(Date.parse(now))) {
        var nowDate = new Date(now);
        var lastendMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0);
        return this.formatDate(lastendMonth, formatStr) + " 23:59:59";
      }
      return now;
    }
  };

  return formatData;
})
```
```
/**
 * 金额千分位格式化函数
 * @param {Number} val - 需要进行金额千分位的数值;
 * @param {Number} metric - 计量单位数值;
 */
define([], function () {
  var formatter = function (val, metric) {
    if(val == '--'){
      return val;
    }
    if((val != 0 && !val) || val === ''){
      return '--';
    }
    //将金额精确到两位小数
    val = (parseFloat(val) / metric).toFixed(2).toString();
    //从小数点处分割
    var vals = val.split('.');
    //定义需要格式化的部分
    var pren = vals[0];
    //小数位
    var post = vals[1];
    //千分位
    var count = 0;
    var result = '';
    for (var i = pren.length - 1; i >= 0; i--) {
      count++;
      result = pren.charAt(i) + result;
      if (!(count % 3) && (i != 0 & pren.charAt(i - 1) != '-')) {
        result = ',' + result;
      }
    }

    return result + '.' + post;
  };
  return formatter;
});
```
```
/**
 * 整数千分位格式化函数
 * @param {Number} val - 整数值;
 */
define([], function () {
  var formatter = function (val) {
    if(val==0){
      return '0';
    }
    //千分位
    var pren = val.toString();
    var count = 0;
    var result = '';
    for (var i = pren.length - 1; i >= 0; i--) {
      count++;
      result = pren.charAt(i) + result;
      if (!(count % 3) && (i != 0 & pren.charAt(i - 1) != '-')) {
        result = ',' + result;
      }
    }
    return result;
  };
  return formatter;
});
```
```
/**
 * easyui-datagrid-寻找所有父级表头名称，输出级联所有表头的路径名称
 * 输出的表头字段中
 * @param {Array} headerList - easyui表头字段(二维数组)
 * 属性：pathName - 表头路径名，包含该表头的所有父级表头名称，使用“>>”分隔；
 * colStart - 表头单元格的位置列坐标(始端)；
 * colEnd   - 表头单元格的位置列坐标(末端)；
 * rowStart - 表头单元格的位置行坐标(始端)；
 * rowEnd   - 表头单元格的位置行坐标(末端)；
 */
define([], function () {
  return {
    computeRelation: function (headerList) {
      var list = headerList;
      if(!list){
        // undefined
        return list;
      }
      for (var i = 0, iLen = list.length; i < iLen; i++) {
        for (var j = 0, jLen = list[i].length; j < jLen; j++) {
          var item = list[i][j]; // 当前遍历的表头字段
          // 第一行
          if (i == 0) {
            // 行始端坐标为0
            item.rowStart = 0;
            // 行始端坐标为该字段的行高
            item.rowEnd = item.rowspan;
            // 表头路径名为该字段的字段名
            item.pathName = item.title;
            if (j == 0) {
              // 第一列
              item.colStart = 0;
              item.colEnd = item.colspan;
            } else {
              // 其他列，由该行的上列计算该列坐标
              item.colStart = list[i][j - 1].colEnd || 0;
              item.colEnd = (list[i][j - 1].colEnd || 0) + item.colspan;
            }
          } else {
            /**
             * 其他行的坐标计算，通过遍历上一行的表头单元格，若其rowEnd小于等于当前行索引可视为该表头单元格不跨行。
             */
            for (var k = 0, kLen = list[i - 1].length; k < kLen; k++) {
              var preItem = list[i - 1][k]; // 上一行的表头字段
              if (i >= preItem.rowEnd) {
                // 排除跨行项
                if (j == 0 || (list[i][j - 1].colEnd <= preItem.colStart)) {
                  // 第一列或当前单元格与上列单元格不属于同一父级，基于父级单元格计算单元格列坐标
                  item.rowStart = preItem.rowEnd;
                  item.rowEnd = preItem.rowEnd + item.rowspan;
                  item.colStart = preItem.colStart || 0;
                  item.colEnd = (preItem.colStart || 0) + item.colspan;
                  item.pathName = preItem.pathName + '>>' + item.title;
                  break;
                } else if ((list[i][j - 1].colEnd < preItem.colEnd) &&
                  (list[i][j - 1].colEnd > preItem.colStart)) {
                  // 当前单元格与上列单元格属于同一父级，基于上列单元格计算单元格列坐标
                  item.rowStart = preItem.rowEnd;
                  item.rowEnd = preItem.rowEnd + item.rowspan;
                  item.colStart = list[i][j - 1].colEnd || 0;
                  item.colEnd = (list[i][j - 1].colEnd || 0) + item.colspan;
                  item.pathName = preItem.pathName + '>>' + item.title;
                  break;
                }
              }
            }
          }
        }
      }
      return list;
    }
  }
});
```
```
define([], function () {
  var urlTool = {
    // 设置url参数
    setParam: function (search, param, value) {
      var query = search.substring(1);
      var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");
      if (p.test(query)) {
        var firstParam = query.split(param)[0];
        var secondParam = query.split(param)[1];
        if (secondParam.indexOf("&") > -1) {
          var lastPraam = secondParam.substring(secondParam.indexOf('&') + 1);
          return '?' + firstParam + param + '=' + value + '&' + lastPraam;
        } else {
          if (firstParam) {
            return '?' + firstParam + param + '=' + value;
          } else {
            return '?' + param + '=' + value;
          }
        }
      } else {
        if (query == '') {
          return '?' + param + '=' + value;
        } else {
          return '?' + query + '&' + param + '=' + value;
        }
      }
    },
    // 获取url-query
    getRequest: function () {
      const url = window.location.search; // 获取url中"?"符后的字串
      const theRequest = {};
      if (url.indexOf('?') !== -1) {
        const str = url.substr(1);
        const strs = str.split('&');
        for (var i = 0; i < strs.length; i += 1) {
          theRequest[strs[i].split('=')[0]] = unescape(decodeURI(strs[i].split('=')[1]));
        }
      }
      return theRequest;
    },
    // 生成参数
    genSearch: function (params) {
      var search = '';
      for (var key in params) {
        search += '&' + key + '=' + params[key];
      }
      return '?' + search.substring(1)
    }
  }
  return urlTool;
})
```
```
/**
 * @desc 导出excel文件
 * @param {String} param - 请求报表参数json对象转换的字符串值
 * @param {String} url - 请求路径
 */
sdExportExcel: function (param, url) {
  var url = url?url:'/rest/gwzjjk/security/survey/exportExcel';
  $('#export-file-form').remove();
  var form = $("<form id='export-file-form' action='" + url + "' method='post'></form>")
  form.append("<input type='hidden' name='params' value='" + param + "'>");
  $(document.body).append(form);
  form.submit();
}
```