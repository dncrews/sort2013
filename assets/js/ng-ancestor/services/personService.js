ancestorApp.factory('personService', ['$http', function($http) {
	return {
		getData: function(cb) {
			$http.get('/data').success(function(data) {
				cb(data);
			});
		}
	}
}]);