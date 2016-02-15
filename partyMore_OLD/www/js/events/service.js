angular.module('EventsService', []).factory('EventsSrv', function($http) {
    return {
		listByUserId : function(userId) {
            return $http.get("http://localhost:8081/events?userId="+userId);
        },
        listPublic : function() {
            return $http.get("http://localhost:8081/events");
        },
        add : function(datas) {
            return $http.post("http://localhost:8081/events", datas);
        },
    };
});