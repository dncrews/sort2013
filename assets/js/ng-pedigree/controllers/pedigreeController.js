pedigreeApp.controller('pedigreeController', ['$scope', 'pedigreeService', function($scope, pedigreeService) {
	pedigreeService.getData(function(data) {
		$scope.pedigree = data;
	});
}]);