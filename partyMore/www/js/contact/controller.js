angular.module('ContactController', [])
.controller('ContactCtrl', function($scope, $localStorage) {
	console.log($localStorage.user.contacts);
	$scope.contacts = $localStorage.user.contacts;
})

.controller('AddcontactCtrl', function($scope, ContactSrv, $localStorage) {


	/*ContactSrv.getContacts($localStorage.user.id).success(function(data){
		console.log(data.contacts);
	});*/
	
});