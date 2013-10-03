ancestorApp.directive('fsFamilyMembers', function() {
	return {
		replace: true,
		templateUrl: 'partials/familymembers',
		link: function(scope, element, attrs) {
			scope.lang = lang;
			scope.$watch('person.nameConclusion.details.fullText', function(newVal, OldVal, scope) {
				var pid, family, children;

				if(newVal !== OldVal) {
					pid = scope.person.id;
					family = scope.family;
					children = family.children;

					if(family.husband.id === pid) {
						family.husband.name = newVal;
					} else if(family.wife.id === pid) {
						family.wife.name = newVal;
					} else {
						for(var i = 0; i < children.length; i++) {
							if(children[i].id === pid) {
								children[i].name = newVal;
								break;
							}
						}
					}
				}
			});
		}
	}
});