ancestorApp.controller('ancestorController', ['$scope', 'personService', function($scope, personService) {
	$scope.loading = true;

	$scope.photoUrlCss = function() {
		var url = this.person && this.person.photoUrl;

		if(url) {
			return 'background-image: ' + url;
		} else {
			return '';
		}
	}

	personService.getData(function(data) {
		$scope.loading = false;
		$scope.person = data;
	});
}]);