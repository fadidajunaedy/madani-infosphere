const tagController = require('../controllers/tagController.js')
const router = require('express').Router()

router.get("/", tagController.getAllTag)
router.get("/:id", tagController.getOneTag)
router.post("/", tagController.addTag)
router.patch("/:id", tagController.updateTag)
router.delete("/:id", tagController.deleteTag)

module.exports = router