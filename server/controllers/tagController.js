const db = require('../models')
const { tagBodyValidation } = require("../utils/validationSchema.js")

const Tag = db.tag

const addTag = async (req, res) => {
    try {
        const { error } = tagBodyValidation(req.body)
        
        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }

        const existingTag = await Tag.findOne({ where: { title: req.body.title }})

        if (existingTag) {
            return res.status(400).json({ error: true, message: "Tag dengan nama ini sudah ada" });
        }

        const newTag = {
            title: req.body.title,
        }

        await Tag.create(newTag)
        return res.status(201).json({ success: true, message: "Tag berhasil dibuat" })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const getAllTag = async (req, res) => {
    try {
        const tags = await Tag.findAll({})
        return res.status(200).json(tags)
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const getOneTag = async (req, res) => {
    try {
        const { id } = req.params
        const tag = await Tag.findOne({ where: { id: id }})
        return res.status(200).json(tag)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const updateTag = async (req, res) => {
    try {
        const { error } = tagBodyValidation(req.body)

        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }

        const tag = await Tag.findOne({ where: { id: req.params.id }})
        
        if (!tag) {
            return res.status(404).json({ error: true, message: "Tag tidak ditemukan" })
        }

        const existingTagWithSameTitle = await Tag.findOne({ where: {title: req.body.title }})

        if (existingTagWithSameTitle && existingTagWithSameTitle._id !== req.params._id) {
            return res.status(400).json({ error: true, message: "Tag dengan nama ini sudah ada" });
        }

        tag.title = req.body.title || tag.title;

        await tag.save()
        return res.status(200).json({ success: true, message: "Tag berhasil diubah" })

    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
}

const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findOne({ where: { id: req.params.id }})
        
        if (!tag) {
            return res.status(404).json({ error: true, message: "Tag tidak ditemukan" })
        }

        await Tag.destroy({ where: { id: req.params.id }})
        return res.status(200).json({ success: true, message: "Tag berhasil dihapus" })
    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
}


module.exports = {
    addTag,
    getAllTag,
    getOneTag,
    updateTag,
    deleteTag
}