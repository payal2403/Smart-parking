const jwt = require("jsonwebtoken");
const skey = "hahahaha@2403";

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({
      message: "Authorization token required",
      status: 401,
      success: false
    });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  jwt.verify(token, skey, function (err, decoded) {
    if (err || !decoded) {
      return res.status(401).send({
        message: "Invalid or expired token",
        status: 401,
        success: false,
        err: err
      });
    }

    if (decoded.userType == "1") {
      req.decoded = decoded;
      req.user = decoded;
      next();
    } else {
      return res.status(403).send({
        message: "Access forbidden: Admin only",
        status: 403,
        success: false
      });
    }
  });
};

