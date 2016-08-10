(function () {
    'use strict';

    angular
        .module('sysApp')
        .controller("sysAppController", sysAppController);

    sysAppController.$inject = ['$rootScope', '$scope', '$log', '$state','$cookies'];

    function sysAppController($rootScope, $scope, $log, $state,$cookies) {
        var vm = $scope.vm = {};
        vm.title = "";

        $log.debug("*************************",$cookies);
        if ($cookies.get('_user')) {
            $scope.CurrentUser = JSON.parse($cookies.get('_user'));
        }

        // 如果cookies里无当前用户信息并且读取mock数据，那么设置当前用户的mock数据
        if (angular.isUndefined($scope.CurrentUser) && !Tool.config.reqType) {
            $scope.CurrentUser = {
                userId: "402881944fa14327014fa1d69b88000f1",
                userLogid: "admin",
                userName: "系统管理员",
                departmentId: "1000000",
                userStatus: "0",
                userToken: "6vQzyx_9LT6x",
                userType: "0"
            }
        }

    }
})();