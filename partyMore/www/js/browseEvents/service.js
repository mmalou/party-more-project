angular.module('BrowseEventsService', []).factory('BrowseEventsSrv', function($http) {
    return {
		getUserByUsername : function(username) {
            return $http.get("http://www.localhost:8081/user/username/"+username);
        },
        getUserEvents : function(user) {
            return $http.get("http://www.localhost:8081/eventuser/"+user);
        }
    };
});