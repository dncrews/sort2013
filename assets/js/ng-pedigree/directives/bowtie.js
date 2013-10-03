pedigreeApp.directive('fsBowtie', ['pedigreeService', function(pedigreeService) {
	return {
		replace: true,
		scope: {
			bowtie: '=',
			root: '=',
			x: '@',
			y: '@',
			showprimary: '@',
			person: '='
		},
		templateUrl: 'partials/bowtie',
		link: function(scope, element, attrs) {
			scope.calcAddLink = function(parent, link) {
				if(parent) {
					return link;
				}
			}

			scope.$watch('person.nameConclusion.details.fullText', function(newVal, oldVal, scope) {
				function updateName(couple, id, name) {
					if(!couple) {
						return;
					}

					if(id === (couple.husband && couple.husband.id)) {
						couple.husband.name = name;
					} else if(id === (couple.wife && couple.wife.id)) {
						couple.wife.name = name;
					}

					updateName(couple.husband && couple.husband.parents, id, name);
					updateName(couple.wife && couple.wife.parents, id, name);
				}

				if(newVal !== oldVal) {
					updateName(scope.bowtie, scope.person && scope.person.id, newVal);
				}
			});
		}
	}
}]);