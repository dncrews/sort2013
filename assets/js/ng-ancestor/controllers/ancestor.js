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

	window.doNameChange = function(name) {
		var date = new Date();

		$scope.person.nameConclusion.details.fullText = name;
		$scope.person.name = name;
		$scope.person.changes.unshift({
			type: "EDIT_PREFERRED_NAME",
			timeStampDisplay: date.getDate() + ' October 2013',
			contributor: {
				name: 'Mark Gardner'
			}
		});
		$scope.$apply();
	}
}]);