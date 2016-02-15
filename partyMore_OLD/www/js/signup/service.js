angular.module('SignupService', []).factory('SignupSrv', function($http) {
    return {
        signupUser : function(user) {
            return $http.post("http://localhost:8081/users/", user);
        },
		getUserByUsername : function(username) {
            return $http.get("http://localhost:8081/users/username/"+username);
        },
        isUser : function(user) {
            return $http.get("http://localhost:8081/users/login/", user);
        },
		getUserByMail : function(mail) {
            return $http.get("http://localhost:8081/users/mail/"+mail);
        }
    };
});