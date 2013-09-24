treeApp.controller('subnavController', ['$scope', function($scope) {
	$scope.pages = [{
		text: lang.nav_tree,
		icon: 'fs-icon-tree',
		hasHistory: true
	}, {
		text: lang.nav_ancestor,
		icon: 'fs-icon-ancestor',
		hasHistory: true
	}, {
		text: lang.nav_search,
		icon: 'fs-icon-search'
	}, {
		text: lang.nav_watch,
		icon: 'fs-icon-tree'
	}];
}]);