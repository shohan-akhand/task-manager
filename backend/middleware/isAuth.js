// Importing JWT for token verification
const jwt = require("jsonwebtoken");

// Middleware to authenticate token
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token == null) {
    req.user == null;
    next();
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
    if (decodedToken) {
      req.user = decodedToken._id;
    } else {
      req.user = null;
    }
    next();
  }
};
