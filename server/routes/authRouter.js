const authController = require('../controllers/authController.js')
const authenticateUser = require('../middleware/authMiddleware.js')
const router = require('express').Router()

router.get('/checkToken', authenticateUser, authController.checkToken)
router.post('/register', authController.register)
router.get('/:userId/verify/:token', authController.verificationAccount)
router.post('/login', authController.login)
router.get("/me", authenticateUser, authController.getUserLogin)
router.patch("/me/update", authenticateUser, authController.updateProfile)
router.post("/me/change-password", authenticateUser, authController.changePassword)
router.post("/forgot-password", authController.forgotPassword)
router.post("/check-token-reset-password", authController.checkIdAndTokenResetPassword)
router.post("/reset-password/:userId/:token", authController.resetPassword)
router.post("/logout", authController.logout)

module.exports = router