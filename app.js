;(function () {
    'use strict';

    angular
        .module('sysApp', [
            'ui.bootstrap',
            'ui.router',
            'ngCookies',
            'ngSanitize',
            'angular-loading-bar',
            'oc.lazyLoad',
            'ncy-angular-breadcrumb',
            'sysApp.layout',
            'sysApp.dashboard',
        ])
        .config(appConfig)
        .run(appRun);

    appConfig.$inject = ['$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', '$breadcrumbProvider'];

    appRun.$inject = ['$rootScope', '$timeout', '$log', 'cfpLoadingBar', '$templateCache'];

    function appConfig($urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $breadcrumbProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.hashPrefix('!');

        $locationProvider.html5Mode(false);

        //cfploadingbar配置
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 500;


        //$breadcrumbProvider面包屑导航
        var breadcrumbTmp = '<ul class="breadcrumb">' +
            '<li>' +
            '<i class="icon-home home-icon"></i>' +
            '<a ui-sref="dashboard">首页</a>' +
            '</li><li ng-repeat="step in steps" ng-class="{active: $last}" style="padding: 0 4px;">{{step.ncyBreadcrumbLabel}}</li>' +
            '</ul>';

        $breadcrumbProvider.setOptions({
            prefixStateName: 'index',
            template: breadcrumbTmp
        });

    }

    function appRun($rootScope, $timeout, $log, cfpLoadingBar, $templateCache) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            cfpLoadingBar.start();
            //jQuery("#loadingDiv").show();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, next) {
            $log.debug("$stateChangeSuccess", next);
            cfpLoadingBar.complete();
            $timeout(function () {
                //jQuery("#loadingDiv").hide();
            }, 800);

        });
        $rootScope.$on('$stateChangeError', function (event, next) {
            $log.debug(next);
            $timeout(function () {
                cfpLoadingBar.complete();
            }, 500);
        });
    }

})();