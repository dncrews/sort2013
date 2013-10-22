ancestorApp.controller('ancestorController', ['$rootScope', '$scope', 'personService', function($rootScope, $scope, personService) {
	var dataCount, dataParts;

	$scope.photoUrlCss = function() {
		var url = this.person && this.person.photoUrl;

		if(url) {
			return 'background-image: ' + url;
		} else {
			return '';
		}
	}

	function initData() {
		var person = dataParts.person;

		$scope.loading = ++dataCount < 7;
		$rootScope.person = person;

		if(!person) {
			return;
		}

		person.lifeSketch = dataParts.lifeSketch;
		person.families = dataParts.families;
		person.discussions = dataParts.discussions;
		person.sources = dataParts.sources;
		person.notes = dataParts.notes;
		person.ordinances = dataParts.ordinances;
	}

	function setData(prop, errMessage) {
		return function(err, data) {
			if(err || !data) {
				$scope.errMessage = errMessage;
			}

			dataParts[prop] = data;
			initData();
		}
	}

	function downloadData() {
		// Dont load data unless we are on the ancestor page and person does not match the personid
		if($scope.pagename === 'ancestor' && (!$scope.person || $scope.person.id !== $scope.personId)) {
			$scope.loading = true;

			dataCount = 0;
			dataParts = {};

			personService.getPerson($scope.personId, setData('person', lang.errorLoadingPerson));
			personService.getLifeSketch($scope.personId, setData('lifeSketch', lang.errorLoadingNotes));
			personService.getFamilyMembers($scope.personId, setData('families', lang.errorLoadingFamlies));
			personService.getDiscussions($scope.personId, setData('discussions', lang.errorLoadingDiscussions));
			personService.getSources($scope.personId, setData('sources', lang.errorLoadingSources));
			personService.getNotes($scope.personId, setData('notes', lang.errorLoadingNotes));
			personService.getOrdinances($scope.personId, $scope.cpUserId, setData('ordinances', lang.errorLoadingOrdinances));
		}
	}

	$scope.loading = true;
	$scope.$watch('personId', function(newValue, oldValue) {
		if(newValue !== oldValue) {
			downloadData();
		}
	});
	$scope.$watch('pagename', function(newValue, oldValue) {
		if(newValue !== oldValue) {
			downloadData();
		}
	});
}]);