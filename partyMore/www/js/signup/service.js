angular.module('SignupService', []).factory('SignupSrv', function($http) {
    return {
        signupUser : function(user) {
            return $http.post("http://localhost:8081/user/", user);
        },
		getUserByUsername : function(username) {
            return $http.get("http://localhost:8081/user/username/"+username);
        },
        isUser : function(user) {
            return $http.get("http://localhost:8081/user/login/", user);
        },
		getUserByMail : function(mail) {
            return $http.get("http://localhost:8081/user/mail/"+mail);
        }
    };
});