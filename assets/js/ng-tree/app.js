var treeApp = angular.module('tree', ['ngRoute', 'ancestor', 'pedigree']);

treeApp.filter('html', function () {
  return function (text) {
  	return FS.htmlDecode(FS.htmlDecode(text));
  }
});

treeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/tree/:personId?/:spouseId?', {
			templateUrl: '/views/tree', 
			controller: 'pedigreeController',
			page: 'tree',
			pageType: 'full'
		})
		.when('/ancestor/:personId?/:spouseId?', {
			templateUrl: '/views/ancestor', 
			controller: 'ancestorController',
			page: 'ancestor'
		})
		.otherwise({redirectTo: '/tree'});
}]);

treeApp.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(e, route) {
		var current = route.$$route;

		if(current) {
			$rootScope.pagename = current.page;

			// Breaking angular rule of placing dom manipulation in a app but due
			// to not having control over the layout.ejs we will have to place a small snippet here.
			window.jQuery && $('#wrapper').attr('data-page', current.page).attr('data-page-type', current.pageType);
		}
	});
}]);