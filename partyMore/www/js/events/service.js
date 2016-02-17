angular.module('EventsService', []).factory('EventsSrv', function($http, $q) {
    var cachedData;

    return {
        events: []
        ,
		listByUserId : function(userId) {
            return $http.get("http://localhost:8081/events?userId="+userId);
        },
        listPublic : function() {
            return $http.get("http://localhost:8081/events");
        },
        add : function(datas) {
            return $http.post("http://localhost:8081/events", datas);
        },
        add : function(datas) {
            return $http.post("http://localhost:8081/events", datas);
        },
        addComment: function(id, datas) {
            return $http.put("http://localhost:8081/events/"+id, datas);
        },
        addUserToEvent: function(id, userId) {
            return $http.post("http://localhost:8081/events/"+id+"/users", {userId: userId});
        },
        setCachedEvents : function(data) {
            this.events = data;
        },
        getEvent: function(id) {
          var dfd = $q.defer();
          this.events.forEach(function(event) {
            if (event._id === id) dfd.resolve(event)
          })

          return dfd.promise;
        }
    };
});