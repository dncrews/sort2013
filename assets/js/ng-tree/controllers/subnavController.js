treeApp.controller('subnavController', ['$scope', function($scope) {
	$scope.pages = [{
		name: 'tree',
		text: lang.nav_tree,
		icon: 'fs-icon-tree',
		hasHistory: true
	}, {
		name: 'ancestor',
		text: lang.nav_ancestor,
		icon: 'fs-icon-ancestor',
		hasHistory: true
	}, {
		name: 'search',
		text: lang.nav_search,
		icon: 'fs-icon-search'
	}, {
		name: 'watch',
		text: lang.nav_watch,
		icon: 'fs-icon-tree'
	}];

	$scope.isActive = function(page) {
		return this.pagename === page.name;
	}
}]);