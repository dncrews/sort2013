var woodruff = require('woodruff'),
	shared = require('shared-ui'),
	fs = require('fs'),
	path = require('path'),
	m = require('./lib/middleware');

var app = module.exports = woodruff(__dirname, shared);

app.get('/', app.restrict(), m.ftUser, function(req, res) {
	res.render('index', {
		user: req.user,
		userInfo: req.userInfo
	});
});

app.get('/views/:view', function(req, res) {
	res.render(req.params.view, {
		layout: null
	});
});

app.get('/partials/:view', function(req, res) {
	res.render('partials/' + req.params.view, {
		layout: null
	});
});

app.get('/data', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	var filePath = path.join(__dirname, 'data/charles_c_rich.json'),
		file = fs.createReadStream(filePath);

	file.pipe(res);
});

app.get('/data-pedigree', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	var filePath = path.join(__dirname, 'data/pedigree.json'),
		file = fs.createReadStream(filePath);

	file.pipe(res);
});

app.configure('development', function() {
	var proxy = require("simple-http-proxy");

	app.useBefore("emptyFavicon", "/tree-data", "tree-data", proxy('https://beta.familysearch.org/tree-data', {timeout: 60000}));
	app.useBefore("emptyFavicon", "/ct", "ct", proxy('https://beta.familysearch.org/ct', {timeout: 60000}));
	app.useBefore("emptyFavicon", "/links", "links", proxy('https://beta.familysearch.org/links', {timeout: 60000}));
	app.useBefore("emptyFavicon", "/familytree", "familytree", proxy('https://beta.familysearch.org/familytree', {timeout: 60000}));
	app.useBefore("emptyFavicon", "/discussions", "discussions", proxy('https://beta.familysearch.org/discussions', {timeout: 60000}));

	app.get('/hijacksession', function(req, res) {
	    res.cookie("fssessionid", req.query.fssessionid);
	    res.redirect(req.resolvePath(req.query.page || '/'));
	});
});