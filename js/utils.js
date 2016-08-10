;
(function (dom) {
    window.Tool = {};

    //标识是否读取本地mock数据 false为读取本地数据 true读取远程的数据
    var pathName = window.document.location.pathname;
    Tool.config = {
        "reqType": false,
        "mockDataUrl": "api",
        "rootUrl": "http://" + window.location.host + pathName.substring(0, pathName.substr(1).indexOf('/') + 1) + "/"
    };
    Tool.VERSION = "1.0.0";

    Tool.support = {};

    Tool.utils = {};

    Tool.ui = {};

    /**
     * 四舍五入函数
     * @param {Object} Dight (需要格式化的值)
     * @param {Object} How (保留几位小数)
     */
    Tool.utils.round = function (Dight, How) {
        Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
        return Dight;
    };

    /**
     * 获取地址栏参数
     * @param {Object} name (表示传入的参数key)
     */
    Tool.utils.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    };


    /**
     * 返回mock数据地址
     * @param {Object} obj
     */
    Tool.utils.returnMockUrl = function (obj) {
        var _temp = obj.url || obj;
        // 第一个问号的位置
        var queryIndex = _temp.indexOf("?");
        // 最后一个反斜杠的位置
        var backslashIndex = _temp.lastIndexOf("/");

        // 依据不同情况返回不同mock地址
        if (backslashIndex > queryIndex && queryIndex > -1) {
            var firstUrl = _temp.substring(0, queryIndex);

            return Tool.config.mockDataUrl + firstUrl.substring(firstUrl.lastIndexOf("/"), _temp.length).replace('.action', '.json') + _temp.substring(queryIndex, _temp.length);
        } else {
            return Tool.config.mockDataUrl + _temp.substring(backslashIndex, _temp.length).replace('.action', '.json');
        }

    };

    /**
     * 获取是否请求远程或者本地数据
     * @param {Object} obj
     */
    Tool.utils.getReqType = function (obj) {
        if (Tool.config.reqType) {
            return true;
        }

        if (!obj.reqType) {
            return false;
        } else {
            return true;
        }
    };

    Tool.utils.installObj = function (config) {
        if (!Tool.utils.getReqType(config)) {
            config.url = Tool.utils.returnMockUrl(config);
        } else {
            config.url = Tool.config.rootUrl + config.url;
        }
        return config;
    };

    Tool.utils.throttle = function (fn, delay, atleast) {
        var timer = null;
        var previous = null;

        return function () {
            var now = +new Date();

            if (!previous) previous = now;
            if (atleast && now - previous > atleast) {
                fn();
                // 重置上一次开始时间为本次结束时间
                //FIX: 需要清除上一次的timer, 不然会出现执行两次fn
                previous = now;
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn();
                    previous = null;
                }, delay);
            }
        }
    };

    /**
     * 生成uuid
     */
    Tool.utils.uuid = function () {
        var d = Date.now();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + _.random(16)) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };

    return Tool;

})(document);