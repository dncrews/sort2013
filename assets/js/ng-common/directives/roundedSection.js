commonApp.directive('fsRoundedSection', function() {
	return {
		transclude: true,
		replace: true,
		scope: {
			title: '@'
		},
		template: '<section class="section-rounded clearfix"><a href="" class="section-toggle">{{toggle}}</a><h4 class="serif">{{title}}</h4><div class="section-content" ng-transclude></div></section>',
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