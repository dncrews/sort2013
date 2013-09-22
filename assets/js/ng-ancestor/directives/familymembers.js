treeApp.directive('fsFamilyMembers', function() {
	return {
		replace: true,
		scope: {
			family: '='
		},
		template: 
'<div class="family-box">\
	<ul class="couple-box unstyled">\
		<li class="fs-icon-male person">\
			<a href="">{{family.husband.name}}</a>\
			<label>{{family.husband.lifeSpan}} • {{family.husband.id}}</label>\
		</li>\
		<li class="fs-icon-female person">\
			<a href="">{{family.wife.name}}</a>\
			<label>{{family.husband.lifeSpan}} • {{family.husband.id}}</label>\
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
				<a href="">{{child.name}}</a>\
				<label>{{child.lifeSpan}} • {{child.id}}</label>\
			</li>\
		</ul>\
	</div>\
</div>',
		link: function(scope, element, attrs) {
			scope.lang = lang;
		}
	}
});