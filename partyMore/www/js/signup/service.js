angular.module('SignupService', []).factory('SignupSrv', function($http) {
    return {
        signupUser : function(user) {
            return $http.post("http://www.localhost:8081/user/", user);
        },
		getUserByUsername : function(username) {
            return $http.get("http://www.localhost:8081/user/username/"+username);
        },
		getUserByMail : function(mail) {
            return $http.get("http://www.localhost:8081/user/mail/"+mail);
        }
    };
});