//Importing the token creation package
const jwt = require("jsonwebtoken");

//Creation of authentication middleware
module.exports = (req, res, next) => {
  try {
    //Retrieving the request token
    const token = req.headers.authorization.split(" ")[1];
    //Check if the token authentication key is correct
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //Retrieving the token userId
    const userId = decodedToken.userId;
    //To declare that this is the user who sent the request
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error("unauthorized request!"),
    });
  }
};
