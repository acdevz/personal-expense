const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateToken = (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { validateToken };
