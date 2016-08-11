/**
 * Created by Administrator on 2016/6/16.
 */
(function () {
    'use strict';

    angular
        .module('sysApp.user.list')
        .controller('userListController', userListController);

    userListController.$inject = ['$scope', 'userService', '$log', '$state'];

    function userListController($scope, UserService, $log, $state) {

        $log.debug("用户列表加载");
        /**
         * ========== 初始化 ==========
         */
        var vm = $scope.vm = {};
        vm.title = "用户列表";

        vm.add = function () {
            $state.go('user.add');
        };

        vm.edit = function (id) {
            $state.go('user.edit', {
                id: id
            });
        };
    }
})();