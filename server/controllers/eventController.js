const db = require('../models')
const { eventBodyValidation } = require("../utils/validationSchema.js")

const Event = db.event

const addEvent = async (req, res) => {
    try {
        const { error } = eventBodyValidation(req.body)
        
        if (error) {
            return res.status(400).json({ error: true, message: error.message });
        }

        const newEvent = {
            title: req.body.title,
            description: req.body.description,
            theme: req.body.theme,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            endDate: req.body.endDate,
            endTime: req.body.endTime,
            createdUser: req.body.createdUser,
        }

        await Event.create(newEvent)
        return res.status(201).json({ success: true, message: "Event berhasil dibuat" })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

getAllEvent = async (req, res) => {
    try {
        const events = await Event.findAll({})
        return res.status(200).json(events)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

getOneEvent = async (req, res) => {
    try {
        const { id } = req.params

        const event = await Event.findOne({ where: { id: id }})
        return res.status(200).json(event)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ where: { id: req.params.id }})
        
        if (!event) {
            return res.status(404).json({ error: true, message: "Event tidak ditemukan" });
        }

        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.theme = req.body.theme || event.theme;
        event.startDate = req.body.startDate || event.startDate;
        event.startTime = req.body.startTime || event.startTime;
        event.endDate = req.body.endDate || event.endDate;
        event.endTime = req.body.endTime || event.endTime;
        event.createdUser = req.body.createdUser || event.createdUser;

        await event.save()
        res.status(200).json({ success: true, message: "Event berhasil diubah" })

    } catch (error) {
        console.error(error)
        res.status(500).send({ error: true, message: error.message })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ where: { id: req.params.id }})
        
        if (!event) {
            return res.status(404).json({ error: true, message: "Event tidak ditemukan" })
        }

        await Event.destroy({ where: { id: req.params.id }})
        return res.status(200).json({ success: true, message: "Event berhasil dihapus" })

    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
}

module.exports = {
    addEvent,
    getAllEvent,
    getOneEvent,
    updateEvent,
    deleteEvent
}