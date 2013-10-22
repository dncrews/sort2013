treeApp.directive('fsPerson', function() {
	return {
		replace: true,
		scope: {
			person: '=',
			root: '=',
			addlink: '@',
			gender: '@'
		},
		templateUrl: 'partials/person',
		link: function(scope, element, attrs) {
			scope.calcClass = function(person) {
				if(!person || person.id === 'UNKNOWN') {
					return 'empty fs-icon-' + this.gender;
				} else {
					return 'fs-icon-' + person.gender.toLowerCase();
				}
			}

			// Add person card trigger
			scope.calcLabel = function(person) {
				if(!person || person.id === 'UNKNOWN') {
					return '';
				}

				if(person.lifeSpan && person.id) {
					return person.lifeSpan + ' • ' + person.id;
				} else if(person.lifeSpan) {
					return person.lifeSpan;
				} else if(person.id) {
					return person.id;
				}
			}
		}
	}
});