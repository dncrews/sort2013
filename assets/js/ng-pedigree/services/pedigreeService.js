pedigreeApp.factory('pedigreeService', ['$http', function($http) {
	return {
		getData: function(cb) {
			$http.get('/data-pedigree').success(function(data) {
				cb(data);
			});
		}
	}
}]);