angular.module('AddcontactService', []).factory('AddcontactSrv', function($http) {
    return {
	
	getUserByUsername : function(username) {
		return $http.get("http://www.localhost:8081/users/username/"+username);
	}
	
    };       
});