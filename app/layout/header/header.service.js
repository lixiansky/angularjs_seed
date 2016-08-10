(function () {
	'use strict';
	
	angular
    .module('sysApp.layout')
    .factory("sysHeaderService",sysHeaderService);
    
    sysHeaderService.$inject = ['$timeout','$log','ajaxService'];
    
    function sysHeaderService($timeout,$log,ajaxService){
    	$log.log("-----------sysHeaderService-------------")
    	var conf = {
			"url": "global/getMenusForModule.action" + "?timestamp=" + new Date().getTime(),
			"params": {"rootEname":"system"},
			"reqType":false
		};
		
    	var service = {};
    	service.getMenus = function(){
    		return ajaxService.getData(conf).then(function(results){
    			$log.debug("sysHeaderService,getMenus",results)
    			return results;
    		});
    	}
    	return service;
    }
})();