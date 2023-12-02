const db = require('../models')
const multer = require('multer')
const path = require('path')
const fs = require("fs")
const { reportBodyValidation } = require("../utils/validationSchema.js")

const Report = db.report

function formatSubcategory(subcategory) {
    return subcategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const addReport = async (req, res) => {
    try {
        const { error } = reportBodyValidation(req.body)

        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }

        if (!req.file && !req.body.linkFile) {
            return res.status(400).json({ error: true, message: "Salah satu File atau Link File harus diisi" })
        }

        let newReport
        if (!req.file && req.body.linkFile) {
            newReport = {
                title: req.body.title,
                category: req.body.category,
                subcategory: req.body.subcategory,
                description: req.body.description,
                tags: req.body.tags,
                year: req.body.year,
                createdUser: req.body.createdUser,
                file: "",
                linkFile: req.body.linkFile,
                relatedProgram: req.body.relatedProgram
            }
        } else if (req.file.filename && !req.body.linkFile) {
            newReport = {
                title: req.body.title,
                category: req.body.category,
                subcategory: req.body.subcategory,
                description: req.body.description,
                tags: req.body.tags,
                year: req.body.year,
                createdUser: req.body.createdUser,
                file: req.file.filename,
                linkFile: "",
                relatedProgram: req.body.relatedProgram
            }
        }

        await Report.create(newReport)
        return res.status(201).json({ success: true, message: `Data ${formatSubcategory(newReport.subcategory)} berhasil ditambahkan` })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const getAllReport = async (req, res) => {
    try {
        const reports = await Report.findAll({})
        return res.status(200).json(reports)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const getOneReport = async (req, res) => {
    try {
        const { id } = req.params
        const report = await Report.findOne({ where: { id: id }})
        return res.status(200).json(report)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const updateReport = async (req, res) => {
    try {
        const { id } = req.params
        
        const report = await Report.findOne({ where: { id: id }})

        if (!report) {
            return res.status(404).json({ error: true, message: "Data tidak ditemukan" });
        }

        if (req.file) {
            fs.unlink(`files/${report.category}/${report.file}`, (err) => {
                if (err) {
                    console.log('File sebelumnya tidak ditemukan, memasukkan file baru');
                } else {
                    console.log('File sebelumnya sudah dihapus,  memasukkan file baru');
                }
            })
            report.file = req.file.filename
        }

        report.title = req.body.title || report.title;
        report.category = req.body.category || report.category;
        report.subcategory = req.body.subcategory || report.subcategory;
        report.description = req.body.description || report.description;
        report.tags = req.body.tags || report.tags;
        report.year = req.body.year || report.year;
        report.linkFile = req.body.linkFile || report.linkFile;
        report.relatedProgram = req.body.relatedProgram || report.relatedProgram;
        report.createdUser = req.body.createdUser || report.createdUser;

        await report.save()
        return res.status(200).json({ success: true, message: `Data berhasil diubah` })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params

        const report = await Report.findOne({ where: { id: id }})

        if (!report) {
            return response.status(404).json({ error: true, message: "Data tidak ditemukan" });
        }

        if (report.file) {
            const filePath = `files/${report.category}/${report.file}`
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log('Gagal menghapus file, kemungkinan filenya tidak ada');
                }
            })
        }

        await Report.destroy({ where: { id: id }})
        return res.status(200).json({ success: true, message: `Data berhasil dihapus` })

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let category = req.body.category
        let dir = `files/${category}/`
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
  
const upload = multer({
    storage: storage,
    limits:{fileSize: 20000000},
}).single("file")

module.exports = {
    addReport,
    getAllReport,
    getOneReport,
    updateReport,
    deleteReport,
    upload
}