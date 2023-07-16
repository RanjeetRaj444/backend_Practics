const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).send("Invalid credential");
  const decoded = jwt.verify(token, "practics");
  if (decoded) {
    req.body.userID = decoded.userID;
    req.body.user = decoded.user;
    next();
  } else {
   return res.status(400).send("user is not authenticate");
  }
};

module.exports = auth;
