const db = require('../models')

const User = db.user

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({})
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { id: id }})
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id }})
        
        if (!user) {
            return res.status(404).json({ error: true, message: "User tidak ditemukan" });
        }
    
        user.name = req.body.name || user.name
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.position = req.body.position || user.position
        user.role = req.body.role || user.role
        user.isVerified = req.body.isVerified
        user.status = req.body.status

        await user.save()
        return res.status(200).json({ success: true, message: `Ubah data ${user.role[0].toUpperCase() + user.role.substring(1)} berhasil` })

    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id }})
        
        if (!user) {
            return res.status(404).json({ error: true, message: `${user.role[0].toUpperCase() + user.role.substring(1)} tidak ditemukan` })
        }

        await User.destroy({ where: { id: req.params.id }})
        return res.status(200).json({ success: true, message: `Data ${user.role[0].toUpperCase() + user.role.substring(1)} berhasil dihapus` })
    
    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }
}

module.exports = {
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser
}