angular.module('SignupService', []).factory('SignupSrv', function($http, APIUrl) {
    return {
        signupUser : function(user) {
            return $http.post(APIUrl+"/users/", user);
        },
		getUserByUsername : function(username) {
            return $http.get(APIUrl+"/users/username/"+username);
        },
        isUser : function(user) {
            return $http.get(APIUrl+"/users/login/", user);
        },
		getUserByMail : function(mail) {
            return $http.get(APIUrl+"/users/mail/"+mail);
        }
    };
});