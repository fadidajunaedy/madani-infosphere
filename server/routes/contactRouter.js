const contactController = require('../controllers/contactController.js')
const router = require('express').Router()

router.get("/", contactController.getAllContact)
router.get("/:id", contactController.getOneContact)
router.post("/", contactController.addContact)
router.post("/many/", contactController.addManyContact)
router.patch("/:id", contactController.updateContact)
router.delete("/:id", contactController.deleteContact)

module.exports = router