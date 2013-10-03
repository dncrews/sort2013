ancestorApp.controller('ancestorController', ['$rootScope', '$scope', 'personService', function($rootScope, $scope, personService) {
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
		$rootScope.person = data;
	});

	window.doNameChange = function(name) {
		var date = new Date();

		$rootScope.person.nameConclusion.details.fullText = name;
		$rootScope.person.name = name;
		$rootScope.person.changes.unshift({
			type: "EDIT_PREFERRED_NAME",
			timeStampDisplay: date.getDate() + ' October 2013',
			contributor: {
				name: 'Mark Gardner'
			}
		});
		$rootScope.$apply();
	}
}]);