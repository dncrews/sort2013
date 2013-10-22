/**
 * Defines
 */
var CAS_PERMISSION_URL = process.env.CAS_PERMISSION_URL || "https://auth.familysearch.org/cas-public-api/authorization/v1/authorize";

/**
 * Make CAS call
 */
exports.authorize = function(agent, permission, sessionId, done) {
	var query = {
		perm: permission, 
		context: 'FamilyTree', 
		sessionId: sessionId
	};

	agent
		.get(CAS_PERMISSION_URL)
		.set("accept", "application/json")
		.query(query)
		.end(function(err, response) {
			done(err, response.body);
		});
};
