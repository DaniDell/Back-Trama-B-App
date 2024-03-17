require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const user = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token' });
        } else {
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = authenticateUser;
