(function () {
    'use strict';

    angular
        .module('sysApp.user.list', [
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad'
        ])
        .config(userListConfig);

    userListConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function userListConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state('user.list', {
                parent: 'user',
                url: '/',
                views: {
                    '': {
                        templateUrl:  'app/user/list/list.html',
                        controller: 'userListController'
                    }
                },
                ncyBreadcrumb: {
                    label: '列表'
                },
                resolve: {
                    loadListCtrl: ['$ocLazyLoad', '$log', function ($ocLazyLoad, $log) {
                        $log.debug("-------动态加载user.list模块加载开始------");
                        return $ocLazyLoad.load([ {
                            serie: true,
                            files: [
                                 'app/user/list/list.controller.js',
                            ]
                        }]).then(function () {
                            $log.debug('--------动态加载user.list加载完毕-------');
                        });
                    }]
                }
            });

    }

})();
