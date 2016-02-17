angular.module('ProfileService', []).factory('ProfileSrv', function($http, APIUrl) {
    return {
		getUserById : function(id, formData) {
			return $http.get(APIUrl+"/users/"+id);
		},
    };       
});
