//Importing the token creation package
const jwt = require("jsonwebtoken");

//Creation of authentication middleware
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "Invalid token!",
      });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("Decoded token:", decodedToken); // Debug log
    req.user = decodedToken;
    next();
  } catch (error) {
    // console.error("Auth middleware error:", error); // Debug log
    res.status(403).json({
      success: false,
      error: "unauthorized request!",
    });
  }
};
