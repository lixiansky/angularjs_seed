(function () {
    'use strict';

    angular
        .module('sysApp.layout')
        .directive('sysHeader', sysHeader);

    sysHeader.$inject = [];

    function sysHeader() {

        function link(scope, elem, attrs, ctl) {
            scope.year = new Date().getFullYear();
        }

        var directive = {
            link: link,
            restrict: 'AE',
            controller: 'sysHeaderController',
            templateUrl:  'app/layout/header/header.html'
        };

        return directive;
    }

})();