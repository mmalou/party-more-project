angular.module('SignupService', []).factory('SignupSrv', function($http) {
    return {

        signupUser : function(user) {
            return $http.post("http://www.localhost:8081/user/", user);
        }

    };       
});