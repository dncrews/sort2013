ancestorApp.directive('fsFamilyMembers', function() {
	return {
		replace: true,
		template: 
'<div class="family-box">\
	<ul class="couple-box unstyled">\
		<li fs-person data-person="family.husband" data-root="person"></li>\
		<li fs-person data-person="family.wife" data-root="person"></li>\
		<li class="married person">\
			<label>{{lang.family_married}}</label>\
			<label>{{family.event.standardDate||family.event.originalDate}}</label>\
			<label>{{family.event.standardPlace||family.event.originalPlace}}</label>\
		</li>\
		<li class="preferred clearfix">\
			<label class="checkbox pull-left">\
				<input type="checkbox" ng-model="family.current"> {{lang.family_preferred}}\
			</label>\
			<a href="" class="pull-right">{{lang.family_edit_couple}}</a>\
		</li>\
	</ul>\
	<div class="children-list" ng-init="family.showChildren = family.current" ng-class="{expanded:family.showChildren}">\
		<a href="javascript:void(0)" class="children-toggle" ng-click="family.showChildren = !family.showChildren">{{lang.family_children}} ({{family.children.length}})</a>\
		<ul class="unstyled">\
			<li fs-person data-person="child" data-root="person" ng-repeat="child in family.children" ></li>\
		</ul>\
	</div>\
</div>',
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