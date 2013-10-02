var treeApp = angular.module('tree', ['ngRoute', 'ngSanitize', 'ancestor', 'pedigree']);

treeApp.filter('html', function () {
  return function (text) {
  	return FS.htmlDecode(FS.htmlDecode(text));
  }
});

treeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/tree/:personId?/:spouseId?', {
			//templateUrl: '/views/tree', 
			//controller: 'pedigreeController',
			page: 'tree',
			pageType: 'full'
		})
		.when('/ancestor/:personId?/:spouseId?', {
			//templateUrl: '/views/ancestor', 
			//controller: 'ancestorController',
			page: 'ancestor'
		})
		.otherwise({redirectTo: '/tree'});
}]);

treeApp.run(['$rootScope', '$route', function($rootScope, $route) {
	$rootScope.isActive = function(page, test) {
		return this.pagename === page.name;
	}

	$rootScope.$on('$routeChangeSuccess', function(e, route) {
		var current = route.$$route,
			$wrapper;

		if(current) {
			$rootScope.pagename = current.page;

			// Breaking angular rule of placing dom manipulation in a app but due
			// to not having control over the layout.ejs we will have to place a small snippet here.
			if(window.jQuery) {
				$('body')
					.attr('data-page', current.page)
					.attr('data-page-type', current.pageType || 'normal');
			}
		}
	});
}]);