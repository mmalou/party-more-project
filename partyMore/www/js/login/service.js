angular.module('LoginService', []).factory('LoginSrv', function($http, APIUrl) {
    return {

		isAuthenticate : function(formData) {
			return $http.post(APIUrl+"/users/login", formData);
		}

    };       
});