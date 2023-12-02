const jwt = require("jsonwebtoken")

const generateRefreshToken = async (user) => {
    const payload = { id: user.id, role: user.role }
    return jwt.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: "730d" }
    )
}

const generateAccessToken = async (user) => {
    const payload = { id: user.id, role: user.role }
    return jwt.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: "180m" }
    )
}

module.exports = {
    generateAccessToken, 
    generateRefreshToken
}
