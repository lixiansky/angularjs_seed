(function () {
    'use strict';

    angular
        .module('sysApp')
        .factory("ajaxService", ajaxService);

    ajaxService.$inject = ['$http', '$q', '$log', '$cookies'];

    function ajaxService($http, $q, $log, $cookies) {
        var service = {};

        /**
         * getData主要用于ajax获取数据用
         * @param {Object} config
         * {"url":"后台请求数据的地址","params":"请求携带的参数"}
         * params:{"id":"9"};
         */
        service.getData = function (config) {
            config = Tool.utils.installObj(config);
            console.log(config)
            var ts = {
                "_": new Date().getTime()
            }

            console.log(JSON.stringify(config));
            if (angular.isUndefined(config.params)) {
                config.params = {};
            }

            config.params = angular.extend(ts, config.params);
            console.log(JSON.stringify(config.params));

            var d = $q.defer();
            var p = $http({
                method: "GET",
                url: config.url,
                params: config.params,
                timeout: 60000,
                headers: {
                    "token": $cookies.user_token
                },
                ignoreLoadingBar: config.ignoreLoadingBar || false
            });
            if (angular.isDefined(config.cache)) {
                p.cache = config.cache;
            }
            p.then(function (results) {
                d.resolve(results);
            }, function (reason) {
                d.reject(reason);
            });
            return d.promise;
        };

        /**
         * postData主要用于数据提交用法与getData类似
         * @param {Object} config
         */
        service.postData = function (config) {
            config = Tool.utils.installObj(config);
            var d = $q.defer();
            var post = $http({
                method: "POST",
                url: config.url,
                // params:config.params,
                data: config.params,
                timeout: 60000,
                headers: {
                    "token": $cookies.user_token
                },
                ignoreLoadingBar: config.ignoreLoadingBar || false
            });//$http.post(config.url, config.params, config.conf);
            post.then(function (results) {
                d.resolve(results);
            }, function (reason) {
                d.reject(reason);
            });
            return d.promise;
        };

        return service;
    }

})();