const express = require("express")
const jwt = require("jsonwebtoken")
const db = require('../models')
const authenticateUser = require("../middleware/authMiddleware.js")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken.js")
const { refreshTokenCookiesValidation } = require("../utils/validationSchema.js")

const router = express.Router()

const User = db.user
const RefreshToken = db.refreshToken

router.post("/", async (req, res, next) => {
    try {
        const { error } = refreshTokenCookiesValidation(req.cookies.refreshToken)

        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }

        const token = req.cookies.refreshToken
        
        if (!token) return res.status(401).json({ message: 'Unauthorized' })

        const verifyToken = await RefreshToken.findOne({ where: { token: token }})

        if (!verifyToken) {
            return res.status(401).json({ error: true, message: 'Invalid refresh token' })
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY)
        const user = await User.findOne({ where: { id: decoded.id }})
        if (!user) {
            return res.status(401).json({ error: true, message: 'User not found' })
        }

        const newAccessToken = await generateAccessToken(user)
        res.cookie('accessToken', newAccessToken, {
            httpOnly: false,
            secure: true,
            withCredentials: true,
        })

        res.status(200).json({ success: true,  message: "Access token created successfully", accessToken: newAccessToken })
        next()
    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
})

module.exports = router