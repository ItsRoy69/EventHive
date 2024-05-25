const jwt = require('jsonwebtoken')

const getJWTToken = (expiresIn, userData) => {
    const payload = userData; // Use the provided user data object directly
    const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn });
    return token;
}

module.exports = getJWTToken