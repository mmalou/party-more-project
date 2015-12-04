angular.module('LoginService', []).factory('LoginSrv', function($http) {
    return {

	getUserByUsername : function(username) {
		return $http.get("http://www.localhost:8081/user/username/"+username);
	}

    };       
});