const eventController = require('../controllers/eventController.js')
const router = require('express').Router()

router.get("/", eventController.getAllEvent)
router.get("/:id", eventController.getOneEvent)
router.post("/", eventController.addEvent)
router.patch("/:id", eventController.updateEvent)
router.delete("/:id", eventController.deleteEvent)

module.exports = router