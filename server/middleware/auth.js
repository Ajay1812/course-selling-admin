const jwt = require('jsonwebtoken');
require("dotenv").config();
const SECRET = process.env.SECRET

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // to get the token ['Bearer','token....']
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Authentication failed");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Authentication failed");
  }
};

module.exports ={
  authenticateJwt,
  SECRET
}