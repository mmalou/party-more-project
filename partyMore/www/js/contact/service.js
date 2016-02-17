angular.module('ContactService', []).factory('ContactSrv', function($http, APIUrl) {
    return {
		addContactByUsername : function(id, formData) {
			return $http.put(APIUrl+"/users/"+id+"?action=addContact", formData);
		},
		removeContactById : function(userId, contactId){
		    return $http.put(APIUrl+"/users/"+userId+"?action=removeContact", {contactId : contactId});
		}
    };       
});
