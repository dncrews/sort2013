ancestorApp.directive('fsConclusion', function() {
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

	return {
		scope: {
			conclusion: '=',
			type: '@'
		},
		templateUrl: 'partials/conclusion',
		link: function(scope, element, attrs) {
			scope.lang = lang;

			scope.conclusionText = function() {
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

			angular.element('.conclusion-trigger', element).click(function() {
				element.toggleClass('extended');

				return false;
			});
		}
	}
});