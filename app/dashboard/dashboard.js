;(function () {
    'use strict';

    angular
        .module('sysApp.dashboard', [
            'ui.router',
            'ui.bootstrap',
            'oc.lazyLoad',
            'ncy-angular-breadcrumb'
        ])
        .config(sysConfig);

    sysConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function sysConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state("dashboard", {
                parent: "index",
                ncyBreadcrumb: {
                    parent: "index",
                    label: '控制台',
                    link: '/'
                },
                url: '/',
                views: {
                    "dashboard@index": {
                        templateUrl:  "app/dashboard/dashboard.html"
                    }
                }
            });

    }

})();
