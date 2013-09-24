ancestorApp.controller('changelogController', ['$scope', function($scope, personService) {
	$scope.getTitle = function(change) {
		return lang['change_type_' + change.type];
	}
}]);