var ancestorApp = angular.module('ancestor', []);

ancestorApp.filter('html', function () {
  return function (text) {
  	return FS.htmlDecode(FS.htmlDecode(text));
  }
});