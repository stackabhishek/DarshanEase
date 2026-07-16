const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Token Missing",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store logged-in user info
    req.user = decoded;

    // Move to next function
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
  const admin = async (req, res, next) => {
  try {

    const User = require("../models/User");

    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  protect,
  admin,
};