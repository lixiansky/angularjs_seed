(function () {
    'use strict';

    angular
        .module('sysApp.user.edit')
        .controller('userEditController', userEditController);

    userEditController.$inject = ['$rootScope','$scope', 'userService', '$log', 'operate', '$state','$timeout'];

    function userEditController($rootScope,$scope, UserService, $log, $operate, $state,$timeout) {
        /**
         * ========== 初始化 ==========
         */
        var newItem = {
            "userId": "-1",
            "userLogid": "",
            "userName": "",
            "departmentId": "",
            "departmentName": "",
            "userStatus": "0",
            "userPhone": "",
            "userMobile": "",
            "userEmail": "",
            "userType": "0"
        };
        var vm = $scope.vm = {};

        vm.operate = $operate;

        vm.cancel = function () {
            if (angular.isDefined($operate.data) && $operate.data.isDirty()) {

                if(confirm("表单数据有变动，确定离开？")){
                    $state.go('user.list');
                    return;
                }
            }else{
                $state.go('user.list');
            }

        };

        vm.getItem = function () {

            if (vm.operate.isAdd) {
                vm.item = newItem;

                $operate.data = UserService.revertableModel.create(vm.item);

            } else {
                UserService.getUserInfo(vm.operate.id).then(function (results) {
                    var data = results.data;
                    if (data.status == '500') {
                        $operate.data.clearDirty();
                        vm.cancel();
                    } else {
                        vm.item = data.data;
                        $operate.data = UserService.revertableModel.create(vm.item);
                    }
                });
            }
        };

        $timeout(function(){
            vm.getItem();
        })

    }
})();