var jwt = require("jsonwebtoken");
const { session } = require("../../config/session");

module.exports = function(req, res, next) {
  var bearerToken;
  var bearerToken = req.headers['authorization'];
  console.log(req.headers);

  jwt.verify(bearerToken, session.secret, function(err, decoded) {
    if (err) {
      //sails.log("verification error", err);
      if (err.name === "TokenExpiredError")
        //return res.forbidden("Session timed out, please login again");
        return res.status(403).json({ "code":10403,"message": "Session timed out, please login again","data":null});
      else
        //return res.forbidden("Error authenticating, please login again");
        return res.status(403).json({ "code":10403,"message": "Error authenticating, please login again","data":null});
    }
    User.findOne(decoded.id).exec(function callback(error, user) {
      if (error) res.json({ "code":10500,"message": "error","data":null});//return res.serverError(err);
      if (!user) res.json({ "code":10500,"message": "User not found","data":null});//return res.serverError("User not found");
      req.user = user;
      next();
    });
    
  });
};