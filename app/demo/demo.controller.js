/**
 * Created by Sweets823 on 2016/6/23.
 */
(function () {
    'use strict';

    angular
        .module('sysApp.demo')
        .controller("demoController", demoController)

    demoController.$inject = ['$scope','$timeout','$log','$q'];


    function demoController($scope,$timeout,$log,$q){
        var vm = $scope.vm = {};
        $log.info("----------demoController,生成成功-----")
        vm.title = "这是Demo页面"

    }

})();