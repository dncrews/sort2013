var treeApp = angular.module('tree', ['ancestor']);

treeApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/views/tree', 
			controller: 'treeController',
			page: 'tree'
		})
		.when('/ancestor/:pid', {
			templateUrl: '/views/ancestor', 
			controller: 'ancestorController',
			page: 'ancestor'
		})
		.otherwise({redirectTo: '/'});
}]);

treeApp.run(['$rootScope', function($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function(e, route) {
		$rootScope.pagename = route.$route.page;
	});
}]);