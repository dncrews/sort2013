describe('conclusion Directive', function() {
	var scope, directive;

	beforeEach(window.module('templeApp'));

	beforeEach(inject(function($rootScope, $directive) {
		scope = $rootScope.$new();
		directive = $controller("ReservationsController", {$scope: scope, templeCardService: mockTempleCardService});
	}));
});