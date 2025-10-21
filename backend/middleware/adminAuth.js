const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "No token, authorization denied" });
  }
  console.log("Auth header:", authHeader); 
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    console.log("Decoded JWT:", decoded);

    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, msg: "Access denied. Admins only." });
    }

    req.user = decoded.id; 
    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err.message);
    res.status(401).json({ success: false, msg: "Token is not valid" });
  }
}

module.exports = adminAuth;
