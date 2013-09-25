treeApp.controller('subnavController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {

	function computePersonSpouseUrl(prefix) {
		var url = [prefix];

		if($routeParams.personId) {
			url.push($routeParams.personId);

			if($routeParams.spouseId) {
				url.push($routeParams.spouseId);
			}
		}

		return url.join('/');
	}

	$scope.pages = [{
		name: 'tree',
		text: lang.nav_tree,
		icon: 'fs-icon-tree',
		hasHistory: true,
		getUrl: function() {
			return computePersonSpouseUrl('tree');
		}
	}, {
		name: 'ancestor',
		text: lang.nav_ancestor,
		icon: 'fs-icon-ancestor',
		hasHistory: true,
		getUrl: function() {
			return computePersonSpouseUrl('ancestor');
		}
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

	$scope.navigate = function(page) {
		$location.path(page.getUrl());
	}
}]);