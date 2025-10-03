const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  // Header və ya cookie-dən refresh token götürək
  const refreshToken = req.header("x-refresh-token") || req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token tapılmadı" });
  }

  try {
    // Refresh token verify edirik
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "refreshPrivateKey"
    );

    // DB-də tokenin hələ də etibarlı olub-olmadığını yoxlayaq
    const user = await User.findOne({ where: { id: decoded.id, refreshToken } });
    if (!user) {
      return res.status(403).json({ message: "Refresh token etibarsızdır" });
    }

    // req.user-ə user məlumatlarını veririk
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Refresh token xətası:", error.message);
    return res.status(403).json({ message: "Yanlış və ya vaxtı bitmiş refresh token" });
  }
};
