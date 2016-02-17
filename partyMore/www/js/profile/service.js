angular.module('ProfileService', []).factory('ProfileSrv', function($http) {
    return {
		getUserById : function(id, formData) {
			return $http.get("http://localhost:8081/users/"+id);
		},
    };       
});
