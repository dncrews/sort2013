pedigreeApp.controller('pedigreeController', ['$scope', 'pedigreeService', function($scope, pedigreeService) {
	pedigreeService.getData(function(data) {
		$scope.pedigree = data;
	});

	$scope.offsetLeft = 0;
	$scope.offsetTop = 0;

	$scope.startDrag = function(e) {
		var offset = this.offset = $(e.currentTarget).children();
		this.offsetLeft = parseInt(offset.css('left'));
		this.offsetTop = parseInt(offset.css('top'));
		this.startOffsetX = e.pageX;
		this.startOffsetY = e.pageY;
		this.dragging = true;

		$(document).one('mouseup', function() {
			$scope.dragging = false;
		});

		e.preventDefault();
	}

	$scope.drag = function(e) {
		if(this.dragging) {
			var x = this.offsetLeft + (e.pageX - this.startOffsetX),
				y = this.offsetTop + (e.pageY - this.startOffsetY);

			this.offset.attr('style', 'left: ' + x + 'px; top: ' + y + 'px;');
		}
	}
}]);