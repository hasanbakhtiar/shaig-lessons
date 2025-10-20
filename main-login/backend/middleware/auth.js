const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, "access_secret", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = decoded;

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "You do not have access permission"
            });
        }

        next();
    });
};
