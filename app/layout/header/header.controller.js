(function () {
    'use strict';

    angular
        .module('sysApp.layout')
        .controller("sysHeaderController", sysHeaderController);

    sysHeaderController.$inject = ['$rootScope', '$scope', '$timeout', '$log', '$stateParams', '$state', 'sysHeaderService'];

    function sysHeaderController($rootScope, $scope, $timeout, $log, $stateParams, $state, sysHeaderService) {
        var vm = $scope.vm = {};
        $log.info("----------sysHeaderController-----")
        vm.systemTitle = "系统管理后台";

        $timeout(function () {
            sysHeaderService.getMenus().then(function (results) {
                $log.debug(results);

                if (results.data.status == 200) {
                    vm.menuBar = results.data.dataList;
                }
            })
        });

    }
})();