treeApp.directive('fsPerson', function() {
	return {
		replace: true,
		scope: {
			person: '=',
			root: '=',
			addlink: '@',
			gender: '@'
		},
		templateUrl: 'partials/person',
		link: function(scope, element, attrs) {
			// Add person card trigger
		}
	}
});