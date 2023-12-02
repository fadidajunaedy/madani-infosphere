const db = require('../models')
const jwt = require("jsonwebtoken")
const { generateAccessToken } = require("../utils/generateToken.js")

const User = db.user

const authenticateUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // If there's no access or refresh token, the user is not authorized
        if (!accessToken && !refreshToken) {
            return res.status(403).json({ error: true, message: "Not authorized" });
        }

        // If there's a refresh token but no access token, verify and create new access token
        if (!accessToken && refreshToken) {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.SECRETKEY);
            const refreshExpirationTimestamp = decodedRefreshToken.exp * 1000;
            const currentTimestamp = Date.now();

            // If the refresh token is expired, the user is not authorized
            if (currentTimestamp >= refreshExpirationTimestamp) {
                return res.status(403).json({ error: true, message: "Not authorized" });
            }

            // Generate a new access token using the refresh token's user information
            const user = await User.findOne({ where: { id: decodedRefreshToken.id }});
            if (!user) {
                return res.status(403).json({ error: true, message: "Not authorized" });
            }

            const newAccessToken = await generateAccessToken(user);
            res.cookie('accessToken', newAccessToken, { secure: true, withCredentials: true });
            req.user = user;
            next();
        } else {
            // If there's an access token, verify it and authorize the user
            const decoded = jwt.verify(accessToken, process.env.SECRETKEY);
            const user = await User.findOne({ where: { id: decoded.id }});
            if (!user) {
                return res.status(403).json({ error: true, message: "Not authorized" });
            }
            req.user = user;
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: error.message });
    }
};


module.exports = authenticateUser