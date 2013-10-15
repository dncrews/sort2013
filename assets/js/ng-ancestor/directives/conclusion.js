ancestorApp.directive('fsConclusion', ['$rootScope', function($rootScope) {
	function normalize(obj, append) {
		var text;

		if(typeof(obj) === 'string') {
			text = obj;
		} else if(obj) {
			text = obj.normalizedText || obj.originalText;
		} else {
			return '';
		}

		return text && text + (append || '');
	}

	function conclusionText() {
		var conclusion = this.conclusion,
			details = conclusion && conclusion.details;

		if(!conclusion) {
			return '';
		}

		switch(this.type) {
			case 'NAME':
				return details.fullText;
			case 'GENDER':
				return details.gender.slice(0, 1) + details.gender.toLowerCase().slice(1);
			case 'BIRTH':
			case 'CHRISTENING':
			case 'DEATH':
			case 'BURIAL':
				return normalize(details.date, '<br>') + normalize(details.place);
			case 'ALTERNATE_NAME':
				return lang['conclusion_ALT_' + details.nameType] + '<br>' + details.fullText;
			case 'OTHER_EVENT':
				return normalize(details.title, '<br>') + normalize(details.description, '<br>') + normalize(details.place);
		}
	}

	return {
		scope: {
			conclusion: '=',
			type: '@'
		},
		templateUrl: 'partials/conclusion',
		link: function(scope, element, attrs) {
			scope.lang = lang;
			scope.conclusionText = conclusionText;

			angular.element('.conclusion-trigger', element).click(function() {
				element.toggleClass('extended');
			});

			angular.element('.conclusion-edit', element).click(function() {
				element.addClass('editing');

				// This is a temporary hack.
				scope.$apply(function(scope) {
					scope.editing = {
						firstNames: scope.conclusion.details.nameForms[0].givenPart,
						lastName: scope.conclusion.details.nameForms[0].familyPart,
						justification: ''
					};
				});
			});

			angular.element('.btn-cancel', element).click(function() {
				element.removeClass('editing');
			});

			angular.element('.btn-primary', element).click(function() {
				element.removeClass('editing');

				// This is a temporary hack.
				$rootScope.$apply(function() {
					var date = new Date();
					
					scope.conclusion.details.nameForms[0].givenPart = scope.editing.firstNames;
					scope.conclusion.details.nameForms[0].familyPart = scope.editing.lastName;
					scope.conclusion.justification = scope.editing.justification;
					scope.conclusion.contributor.date = date.getDate() + ' October 2013';
					scope.conclusion.contributor.name = 'Mark Gardner';
					
					$rootScope.person.name = scope.conclusion.details.fullText = scope.editing.firstNames + ' ' + scope.editing.lastName;
					$rootScope.person.changes.unshift({
						type: "EDIT_PREFERRED_NAME",
						timeStampDisplay: date.getDate() + ' October 2013',
						contributor: {
							name: 'Mark Gardner'
						}
					});
				});
			});
		}
	}
}]);