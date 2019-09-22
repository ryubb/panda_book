const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "pandabook");
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
