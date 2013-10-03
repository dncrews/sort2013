treeApp.directive('fsRoundedSection', function() {
	return {
		transclude: true,
		replace: true,
		scope: {
			title: '@'
		},
		templateUrl: 'partials/roundedsection',
		link: function(scope, element, attrs) {
			scope.toggle = lang.section_close;

			angular.element('.section-toggle', element).click(function() {
				var $content = angular.element('.section-content', element);

				if($content.hasClass('hide')) {
					$content.removeClass('hide');
					scope.toggle = lang.section_close;
				} else {
					$content.addClass('hide');
					scope.toggle = lang.section_open;
				}

				scope.$apply();

				return false;
			});
		}
	}
});