const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.get("/", userController.getAllUser)
router.get("/:id", userController.getOneUser)
router.post("/", authController.register)
router.patch("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router