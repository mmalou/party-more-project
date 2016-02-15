angular.module('ContactService', []).factory('ContactSrv', function($http) {
    return {
		addContactByUsername : function(id, formData) {
			return $http.put("http://www.localhost:8081/users/"+id+"?action=addContact", formData);
		}
    };       
});