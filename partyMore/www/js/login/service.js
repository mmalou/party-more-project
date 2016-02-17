angular.module('LoginService', []).factory('LoginSrv', function($http) {
    return {

		isAuthenticate : function(formData) {
			return $http.post("http://localhost:8081/users/login", formData);
		}

    };       
});