/**
 * Defines
 */
var USER_URL = process.env.USER_URL || "https://beta.familysearch.org/ftuser/users/CURRENT";

exports.ftUser = function(agent, sessionId, next) {
  agent
    .get(USER_URL)
    .query({sessionId: sessionId})
    .set("accept", "application/json")
    .set("authorization", "Bearer "+sessionId)
    .end(function(err, res) {
      if(err) return next(err);
      if(res.error) return next(new Error(res.text));

      next(null, res.body);
    });
};