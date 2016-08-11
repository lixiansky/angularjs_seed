(function () {
    'use strict';

    angular
        .module('sysApp.user', [
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'sysApp.user.list',
            'sysApp.user.edit'
        ])
        .config(userConfig);

    userConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function userConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state("user", {
                parent: "index",
                url: '/user',
                ncyBreadcrumb: {
                    label: '用户'
                },
                views: {
                    "dashboard@index": {
                        templateUrl:  "app/user/user.html"
                    }
                },
                resolve: {
                    loadCtrl: ['$ocLazyLoad', '$log', function ($ocLazyLoad, $log) {
                        return $ocLazyLoad.load([{
                            serie: true,
                            files: [
                                'app/user/user.service.js',
                                'app/user/list/list.js'
                            ]
                        }]).then(function () {
                            $log.debug('--------动态加载user加载完毕-------');
                        });
                    }]
                }
            });
    }

})();
