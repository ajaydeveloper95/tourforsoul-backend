// its a middleware for verify the data
const jwt = require("jsonwebtoken");
const JwtPrivateKey = "ajay@ajay9587ajay@AJAY9587";

exports.verify = (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    // verify token with the key of generating
    const verifyToken = jwt.verify(token, JwtPrivateKey);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
