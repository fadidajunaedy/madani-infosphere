const db = require('../models')
const { contactBodyValidation } = require("../utils/validationSchema.js")

const Contact = db.contact

const addManyContact = async (req, res) => {
    try {
        const contacts = req.body.contacts
        const validationErrors = []

        for (const contact of contacts) {
            const { error } = contactBodyValidation(contact)

            if (error) {
                validationErrors.push({ contact: contact, error: error.message })
            }
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ error: true, message: validationErrors })
        }

        await Contact.bulkCreate(contacts)
        return res.status(201).json({ success: true, message: "Kontak berhasil dibuat" })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const addContact = async (req, res) => {
    try {
        const { error } = contactBodyValidation(req.body)
        
        if (error) {
            return res.status(400).json({ error: true, message: error.message });
        }

        const newContact = {
            name: req.body.name,
            institution: req.body.institution,
            email: req.body.email,
            city: req.body.city,
            telephone: req.body.telephone,
            position: req.body.position,
            classification: req.body.classification,
            createdUser: req.body.createdUser
        }

        await Contact.create(newContact)
        return res.status(201).json({ success: true, message: "Kontak berhasil dibuat" })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

getAllContact = async (req, res) => {
    try {
        const contacts = await Contact.findAll({})
        return res.status(200).json(contacts)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

getOneContact = async (req, res) => {
    try {
        const { id } = req.params

        const contact = await Contact.findOne({ where: { id: id }})
        return res.status(200).json(contact)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({ where: { id: req.params.id }})
        
        if (!contact) {
            return res.status(404).json({ error: true, message: "Kontak tidak ditemukan" });
        }

        contact.name = req.body.name || contact.name;
        contact.institution = req.body.institution || contact.institution;
        contact.email = req.body.email || contact.email;
        contact.city = req.body.city || contact.city;
        contact.telephone = req.body.telephone || contact.telephone;
        contact.position = req.body.position || contact.position;
        contact.classification = req.body.classification || contact.classification;
        contact.createdUser = req.body.createdUser || contact.createdUser 

        await contact.save()
        res.status(200).json({ success: true, message: "Kontak berhasil diubah" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: true, message: error.message })
    }
}

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({ where: { id: req.params.id }})
        
        if (!contact) {
            return res.status(404).json({ error: true, message: "Kontak tidak ditemukan" })
        }

        await Contact.destroy({ where: { id: req.params.id }})
        return res.status(200).json({ success: true, message: "Kontak berhasil dihapus" })

    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
}

module.exports = {
    addManyContact,
    addContact,
    getAllContact,
    getOneContact,
    updateContact,
    deleteContact
}