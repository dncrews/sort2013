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
		template: 
'<div class="bowtie-container">\
	<ul class="primary" ng-show="showprimary">\
		<li fs-person data-person="bowtie.husband" data-root="root" data-gender="male" data-addlink="Add Husband"></li>\
		<li fs-person data-person="bowtie.wife" data-root="root" data-gender="female" data-addlink="Add Wife"></li>\
	</ul>\
	<ul class="husband-parents">\
		<li fs-person data-person="bowtie.husband.parents.husband" data-root="root" data-gender="male" data-addlink="{{calcAddLink(bowtie.husband, \'Add Husband\')}}"></li>\
		<li fs-person data-person="bowtie.husband.parents.wife" data-root="root" data-gender="female" data-addlink="{{calcAddLink(bowtie.husband, \'Add Wife\')}}"></li>\
	</ul>\
	<ul class="wife-parents">\
		<li fs-person data-person="bowtie.wife.parents.husband" data-root="root" data-gender="male" data-addlink="{{calcAddLink(bowtie.wife, \'Add Husband\')}}"></li>\
		<li fs-person data-person="bowtie.wife.parents.wife" data-root="root" data-gender="female" data-addlink="{{calcAddLink(bowtie.wife, \'Add Wife\')}}"></li>\
	</ul>\
	<ul class="husband-father-parents">\
		<li fs-person data-person="bowtie.husband.parents.husband.parents.husband" data-root="root" data-gender="male" data-addlink="{{calcAddLink(bowtie.husband.parents.husband, \'Add Husband\')}}"></li>\
		<li fs-person data-person="bowtie.husband.parents.husband.parents.wife" data-root="root" data-gender="female" data-addlink="{{calcAddLink(bowtie.husband.parents.husband, \'Add Wife\')}}"></li>\
	</ul>\
	<ul class="husband-mother-parents">\
		<li fs-person data-person="bowtie.husband.parents.wife.parents.husband" data-root="root" data-gender="male" data-addlink="{{calcAddLink(bowtie.husband.parents.wife, \'Add Husband\')}}"></li>\
		<li fs-person data-person="bowtie.husband.parents.wife.parents.wife" data-root="root" data-gender="female" data-addlink="{{calcAddLink(bowtie.husband.parents.wife, \'Add Wife\')}}"></li>\
	</ul>\
	<ul class="wife-father-parents">\
		<li fs-person data-person="bowtie.wife.parents.husband.parents.husband" data-root="root" data-gender="male" data-addlink="{{calcAddLink(bowtie.wife.parents.husband, \'Add Husband\')}}"></li>\
		<li fs-person data-person="bowtie.wife.parents.husband.parents.wife" data-root="root" data-gender="female" data-addlink="{{calcAddLink(bowtie.wife.parents.husband, \'Add Wife\')}}"></li>\
	</ul>\
	<ul class="wife-mother-parents">\
		<li fs-person data-person="bowtie.wife.parents.wife.parents.husband" data-root="root" data-gender="male" data-addlink="{{calcAddLink(bowtie.wife.parents.wife, \'Add Husband\')}}"></li>\
		<li fs-person data-person="bowtie.wife.parents.wife.parents.wife" data-root="root" data-gender="female" data-addlink="{{calcAddLink(bowtie.wife.parents.wife, \'Add Wife\')}}"></li>\
	</ul>\
</div>',
		link: function(scope, element, attrs) {
			//scope.lang = lang;
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