const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "No token, authorization denied" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role && decoded.role !== "user") {
      return res.status(403).json({ success: false, msg: "Access denied. Users only." });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ success: false, msg: "Token is not valid" });
  }
}

module.exports = auth;
