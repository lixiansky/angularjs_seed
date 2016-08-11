;(function () {
    'use strict';

    angular
        .module('sysApp.user')
        .factory("userService", userService);

    /**
     * ========== 用户数据的service ==========
     */
    userService.$inject = ['ajaxService', '$q'];
    function userService(ajaxService, $q) {
        var service = {};
        var getUserInfo_URL = 'core/userManage/getUserInfo.action';

        service.getUserInfo = function (id) {
            // 组织查询参数
            var params = '';
            if (angular.isDefined(id)) {
                params = {
                    'userId': id
                };
            }
            // 读取数据
            return ajaxService.getData({'url': getUserInfo_URL, 'params': params});
        };

        service.revertableModel = {
            create: function (model) {
                return {
                    editableModel: angular.copy(model),
                    originalModel: model,
                    isDirty: function () {
                        console.log(this.editableModel,this.originalModel)
                        return !angular.equals(this.editableModel, this.originalModel);
                    },
                    revert: function () {
                        angular.copy(this.originalModel, this.editableModel);
                    },
                    clearDirty: function () {
                        angular.copy(this.editableModel, this.originalModel);
                    }
                }
            }
        };
        return service;
    }
})();