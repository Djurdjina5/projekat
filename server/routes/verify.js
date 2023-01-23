const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  header = req.headers.authorization;
  const token = header.split(" ")[1];
  console.log(token);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({
          isLoggedIn: false,
          message: " Faild to Autehtnicate",
        });
      }
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token given", isLoggedIn: false });
  }
}

module.exports.jwt_verify = verifyJWT;
