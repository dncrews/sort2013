var woodruff = require('woodruff'),
	shared = require('shared-ui'),
	fs = require('fs'),
	path = require('path');

var app = module.exports = woodruff(__dirname, shared);

app.get(/\/ancestor(.*)/, function(req, res) {
	if(req.url === '/ancestor') {
		res.render('ancestor');
	} else {
		res.end('test');
	}
});

app.get('/data', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	var filePath = path.join(__dirname, 'data/charles_c_rich.json'),
		file = fs.createReadStream(filePath);

	file.pipe(res);
});