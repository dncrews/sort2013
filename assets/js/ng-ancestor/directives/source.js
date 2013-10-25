ancestorApp.directive('fsSource', ['$rootScope', function($rootScope) {
	return {
		replace: true,
		scope: {
			source: '=fsSource'
		},
		templateUrl: 'partials/source',
		link: function(scope, element, attrs) {
			angular.element('.data-trigger', element).click(function() {
				element.toggleClass('extended');
			});
		}
	}
}]);