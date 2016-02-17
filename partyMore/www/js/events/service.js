angular.module('EventsService', []).factory('EventsSrv', function($http, $q, APIUrl) {
    var cachedData;

    return {
        events: []
        ,
		listByUserId : function(userId) {
            return $http.get(APIUrl+"/events?userId="+userId);
        },
        listPublic : function() {
            return $http.get(APIUrl+"/events");
        },
        add : function(datas) {
            return $http.post(APIUrl+"/events", datas);
        },
        add : function(datas) {
            return $http.post(APIUrl+"/events", datas);
        },
        addComment: function(id, datas) {
            return $http.put(APIUrl+"/events/"+id, datas);
        },
        addUserToEvent: function(id, userId) {
            return $http.post(APIUrl+"/events/"+id+"/users", {userId: userId});
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