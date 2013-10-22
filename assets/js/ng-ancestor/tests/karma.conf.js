var path = require('path'),
    projectPath = path.resolve(__dirname, '../../../..'),
    masterConf = require(path.join(projectPath, 'node_modules/frontier-build-tools/test/fskarma10-config'));
module.exports = function(config) {
  masterConf(config, {
    projectPath: projectPath,
    testFiles: [
      'vendor/angular/js/angular-1.2.0.js',
      'vendor/angular/js/angular-1.2.0-mocks.js',
      'vendor/angular/js/angular-1.2.0-sanitize.js',
      {pattern: 'assets/js/ng-ancestor/controllers/**/*.js', watched: true, included: false, served: false},
      {pattern: 'assets/js/ng-ancestor/directives/**/*.js', watched: true, included: false, served: false},
      {pattern: 'assets/js/ng-ancestor/services/**/*.js', watched: true, included: false, served: false},
      'assets/js/ng-ancestor/assembly.json',
      'assets/js/ng-ancestor/test/**/*.js'
    ]
  });
}

