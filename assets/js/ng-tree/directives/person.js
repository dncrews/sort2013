treeApp.directive('fsPerson', function() {
	return {
		replace: true,
		scope: {
			person: '=',
			root: '=',
			addlink: '@',
			gender: '@'
		},
		template: 
'<li class="fs-icon-{{(person.gender||gender)|lowercase}} person" ng-class="{empty: !person}">\
	<a href="" ng-class="{focused: person.id == root.id}" ng-show="person">{{person.name}}</a>\
	<a href="" ng-hide="person">{{addlink}}</a>\
	<label>{{person.lifeSpan}} • {{person.id}}</label>\
</li>',
		link: function(scope, element, attrs) {
			// Add person card trigger
		}
	}
});