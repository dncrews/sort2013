ancestorApp.directive('fsOrdinance', function() {
	return {
		replace: true,
		templateUrl: 'partials/ordinance',
		scope: {
			ordinance: '=fsOrdinance'
		},
		link: function(scope, element, attrs) {
			scope.getIconClass = function(ordinance) {
				if(!ordinance) {
					return '';
				}

				var type = ordinance.status || (ordinance[0] && ordinance[0].status) || '';

				return 'ord-icon-' + type.toLowerCase();
			}

			scope.getIconType = function(ordinance) {
				if(!ordinance) {
					return '';
				}

				switch (ordinance.type || (ordinance[0] && ordinance[0].type)) {
					case 'SealingToParents':
						return 'SP';
					case 'SealingToSpouse':
						return 'SS';
					default:
						return ordinance.type.slice(0, 1);
				}
			}

			scope.getLabel = function(ordinance) {
				if(!ordinance) {
					return '';
				}

				var type = ordinance.type || (ordinance[0] && ordinance[0].type);

				return lang['ordinance_' + type];
			}

			scope.getStatus = function(ordinance) {
				if(!ordinance) {
					return '';
				}

				if(ordinance.length) {
					return ordinance[0].statusText;
				} else {
					return ordinance.statusText;
				}
			}

			scope.getDate = function(ordinance) {
				if(!ordinance) {
					return '';
				}

				if(ordinance.length) {
					return ordinance[0].lastModifiedDate || ordinance[0].completedDate;
				} else {
					return ordinance.lastModifiedDate || ordinance.completedDate;
				}
			}

			scope.getPlace = function(ordinance) {
				if(!ordinance) {
					return '';
				}

				if(ordinance.length) {
					return ordinance[0].completedPlace;
				} else {
					return ordinance.completedPlace;
				}
			}
		}
	}
});