(function () {
    'use strict';

    angular
        .module('sysApp.user.edit', [
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad'
        ])
        .config(userEditConfig);

    userEditConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];


    function userEditConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        var editViews = {
            '': {
                templateUrl: 'app/user/edit/edit.html',
                controller: 'userEditController'
            }
        };

        function getOperate(isAdd, $stateParams) {
            return {
                isAdd: isAdd,
                id: $stateParams.id || '-1'
            }
        }

        $stateProvider
            .state('user.edit', {
                url: '/edit/:id',
                views: editViews,
                ncyBreadcrumb: {
                    label: '编辑'
                },
                resolve: {
                    operate: ['$stateParams', function ($stateParams) {
                        return getOperate(false, $stateParams);
                    }],
                    loadListCtrl: ['$ocLazyLoad', '$log', function ($ocLazyLoad, $log) {
                        $log.debug("-------动态加载user.list模块加载开始------");
                        return $ocLazyLoad.load([{
                            serie: true,
                            files: [
                                'app/user/edit/edit.controller.js'
                            ]
                        }]).then(function () {
                            $log.debug('--------动态加载 user.edit 加载完毕-------');
                        });
                    }]

                },
                onExit: ['operate', '$log', function (operate, $log) {
                    $log.debug(operate, '================================');
                }]
            })
            .state('user.add', {
                url: '/add',
                views: editViews,
                ncyBreadcrumb: {
                    label: '新增'
                },
                resolve: {
                    operate: ['$stateParams', function ($stateParams) {
                        return getOperate(true, $stateParams);
                    }],
                    loadListCtrl: ['$ocLazyLoad', '$log', function ($ocLazyLoad, $log) {
                        return $ocLazyLoad.load([{
                            serie: true,
                            files: [
                                'app/user/edit/edit.controller.js'
                            ]
                        }]).then(function () {
                            $log.debug('--------动态加载 user.create 加载完毕-------');
                        });
                    }]
                },
                onExit: ['operate', '$log','$rootScope' ,function (operate, $log,$rootScope) {
                    $log.debug(operate, '================================');
                }]
            });

    }

})();
