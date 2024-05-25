const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        token = req.headers['authorization']?.split(' ')[1];
    }
    if (!token) {
        return res.status(403).send("No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userId = decoded.userId;
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            return res.status(500).json({ error: 'Internal server error from middleware' });
        }
    }
};

module.exports = {
    verifyToken,
}