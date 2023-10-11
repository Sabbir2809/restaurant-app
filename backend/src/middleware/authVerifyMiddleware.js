const { DecodedToken } = require("../utility/JWT");

module.exports = (req, res, next) => {
  const token = req.headers["token"];
  // token validation check
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing, Unauthorized User" });
  }

  // decode token
  const decoded = DecodedToken(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return res.status(401).json({ success: false, message: "Token missing, Unauthorized User" });
  }

  // decoded info
  req.decoded = decoded;
  next();
};
