pedigreeApp.directive('fsBowtie', ['pedigreeService', function(pedigreeService) {
	return {
		replace: true,
		scope: {
			bowtie: '=',
			x: '@',
			y: '@'
		},
		template: 
'<div class="bowtie-container">\
	<ul class="primary">\
		<li class="husband">\
			<a href="">{{bowtie.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.wife.name}}</a>\
		</li>\
	</ul>\
	<ul class="husband-parents">\
		<li class="husband">\
			<a href="">{{bowtie.husband.parents.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.husband.parents.wife.name}}</a>\
		</li>\
	</ul>\
	<ul class="wife-parents">\
		<li class="husband">\
			<a href="">{{bowtie.wife.parents.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.wife.parents.wife.name}}</a>\
		</li>\
	</ul>\
	<ul class="husband-father-parents">\
		<li class="husband">\
			<a href="">{{bowtie.husband.parents.husband.parents.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.husband.parents.husband.parents.wife.name}}</a>\
		</li>\
	</ul>\
	<ul class="husband-mother-parents">\
		<li class="husband">\
			<a href="">{{bowtie.husband.parents.wife.parents.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.husband.parents.wife.parents.wife.name}}</a>\
		</li>\
	</ul>\
	<ul class="wife-father-parents">\
		<li class="husband">\
			<a href="">{{bowtie.wife.parents.husband.parents.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.wife.parents.husband.parents.wife.name}}</a>\
		</li>\
	</ul>\
	<ul class="wife-mother-parents">\
		<li class="husband">\
			<a href="">{{bowtie.wife.parents.wife.parents.husband.name}}</a>\
		</li>\
		<li class="wife">\
			<a href="">{{bowtie.wife.parents.wife.parents.wife.name}}</a>\
		</li>\
	</ul>\
</div>',
		link: function(scope, element, attrs) {
			//scope.lang = lang;
		}
	}
}]);