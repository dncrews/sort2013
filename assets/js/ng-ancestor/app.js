var treeApp = angular.module('treeApp', ['commonApp']);

treeApp.filter('html', function () {
  return function (text) {
  	return FS.htmlDecode(FS.htmlDecode(text));
  }
});