var user = require('../services/user');

exports.ftUser = function(req, res, next) {
	user.ftUser(req.superagent, req.user.sessionId, function(err, userInfo) {
		req.userInfo = userInfo;

		next();
	});
}