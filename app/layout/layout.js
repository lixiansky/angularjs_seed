;(function () {
    'use strict';

    angular
        .module('sysApp.layout', [
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad'
        ])
        .config(layoutConfig);

    layoutConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function layoutConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        console.log("进入layout模块")

        var layoutState = {
            name: 'index',
            abstract: true,
            ncyBreadcrumb: {
                label: '首页'
            },
            url: '',
            views: {
                '': {
                    templateUrl:  'app/layout/layout.html',
                    controller: 'sysAppController'
                }
            },
            resolve: {
                loadHeadCtrl: ['$ocLazyLoad', '$log', function ($ocLazyLoad, $log) {
                    $log.debug("-------动态加载header模块加载开始------");
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: [
                                'app/app.controller.js',
                                'app/layout/header/header.service.js',
                                'app/layout/header/header.controller.js',
                                'app/layout/header/header.directive.js'
                            ]
                        }])
                        .then(function () {
                            $log.debug('--------动态加载header加载完毕-------');
                        });
                }]
            }
        };

        $stateProvider
            .state(layoutState);
    }

})();