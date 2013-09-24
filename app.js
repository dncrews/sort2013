var woodruff = require('woodruff'),
	shared = require('shared-ui'),
	fs = require('fs'),
	path = require('path');

var app = module.exports = woodruff(__dirname, shared);

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/views/:view', function(req, res) {
	res.render(req.params.view, {
		layout: null
	});
});

app.get('/data', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	//setTimeout(function() {

	var filePath = path.join(__dirname, 'data/charles_c_rich.json'),
		file = fs.createReadStream(filePath);

	file.pipe(res);

	//}, 2000);
});