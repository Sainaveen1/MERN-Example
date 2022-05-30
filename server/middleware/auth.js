const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.API_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ success: false, message: err });
  }
};

module.exports = verifyToken;
