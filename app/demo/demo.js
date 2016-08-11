/**
 * Created by Sweets823 on 2016/6/23.
 */
(function () {
    'use strict';
    angular
        .module('sysApp.demo', [
            'ui.router',
            'ui.bootstrap',
            'ngSanitize',
            'oc.lazyLoad'
        ])
        .config(demoConfig)


    demoConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];


    function demoConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state("demo", {
                parent: "index",
                url: '/demo',
                ncyBreadcrumb: {
                    label: 'demo测试'
                },
                views: {
                    "dashboard@index": {
                        templateUrl:  "app/demo/demo.html",
                        controller: 'demoController'
                    }
                },
                resolve: {
                    loadCtrl: ['$ocLazyLoad', '$log', function ($ocLazyLoad, $log) {
                        return $ocLazyLoad.load([{
                            serie: true,
                            files: [
                                 'app/demo/demo.controller.js'
                            ]
                        }]).then(function () {
                            $log.debug('--------动态加载demo.controller加载完毕-------');
                        });
                    }]
                }
            });
    }

})();