ancestorApp.directive('fsFamilyMembers', function() {
	return {
		replace: true,
		template: 
'<div class="family-box">\
	<ul class="couple-box unstyled">\
		<li class="fs-icon-male person">\
			<a href="" ng-class="{focused: person.id == family.husband.id}">{{family.husband.name}}</a>\
			<label>{{family.husband.lifeSpan}} • {{family.husband.id}}</label>\
		</li>\
		<li class="fs-icon-female person">\
			<a href="" ng-class="{focused: person.id == family.wife.id}">{{family.wife.name}}</a>\
			<label>{{family.wife.lifeSpan}} • {{family.wife.id}}</label>\
		</li>\
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
			<li ng-repeat="child in family.children" class="person fs-icon-{{child.gender|lowercase}}">\
				<a href="" ng-class="{focused: person.id == child.id}">{{child.name}}</a>\
				<label>{{child.lifeSpan}} • {{child.id}}</label>\
			</li>\
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