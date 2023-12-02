const db = require('../models')
const crypto = require("crypto")
const { 
    registerBodyValidation,
    loginBodyValidation,
    verificationTokenParamsValidation
 } = require("../utils/validationSchema.js")
const { sendEmailVerification, sendEmailResetPassword } = require("../utils/sendMail.js")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken.js")

const User = db.user
const VerificationToken = db.verificationToken
const RefreshToken = db.refreshToken
const ResetPasswordToken = db.resetPasswordToken

const checkToken = async (req, res) => {
    if (req.user) {
        return res.status(200).json({ success: true, message: 'Token Tersedia'});
    }
    return res.status(400).send({ error: true, message: 'Token tidak tersedia' })
}

const register = async (req, res) => {
    try {
        const { name, username, email, position, role, password, isVerified, status } = req.body

        const { error } = registerBodyValidation(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }

        const existingUsername = await User.findOne({ where: { username: username }})
        if (existingUsername) {
            return res.status(409).json({ error: true, message: "Username sudah terdaftar" })
        }

        const existingEmail = await User.findOne({ where: { email: email }})
        if (existingEmail) {
            return res.status(409).json({ error: true, message: "Email sudah terdaftar" })
        }

        const hash = crypto.createHash('sha512')
        const hashPassword = hash.update(password, 'utf-8').digest('hex')

        const user = await User.create({ name, username, email, position, role, password: hashPassword, isVerified, status })

        if (isVerified === true) {
            return res.status(201).json({ success: true, message: `Pendaftaran ${user.role[0].toUpperCase() + user.role.substring(1)} berhasil` })
        }
        
        const verificationToken = await VerificationToken.create({ userId:user.id, token: crypto.randomBytes(24).toString("hex") })

        const url = `http://localhost:5173/verify/${verificationToken.userId}/${verificationToken.token}`
        await sendEmailVerification(user.email, url)

        return res.status(201).json({ success: true, message: "Pendaftaran berhasil, Verifikasi email telah dikirim ke akun email Anda, silakan verifikasi" })
    
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const login = async (req, res, next) => {
    try {
        const { error } = loginBodyValidation(req.body)
        const { email, password } = req.body

        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }

        if(!email || !password ){
            return res.status(400).json({ error: true, message:'Semua Input wajib diisi' })
        }

        const user = await User.findOne({ where: { email: email }})
        
        if (!user) {
            return res.status(401).json({ error: true, message: 'Email atau Password salah' })
        }

        const hash = crypto.createHash('sha512');
        const hashedPassword = hash.update(password, 'utf-8').digest('hex');
        
        if (hashedPassword !== user.password) {
            return res.status(401).json({ error: true, message: 'Email atau Password salah' });
        }

        if (!user.isVerified) {
            let verificationToken = await VerificationToken.findOne({ where: { userId: user.id }})
            if (!verificationToken) {
                let newVerificationToken = await VerificationToken.create({ userId:user.id, token: crypto.randomBytes(24).toString("hex") })
                const url = `http://localhost:5173/verify/${newVerificationToken.userId}/${newVerificationToken.token}`
                await sendEmailVerification(user.email, url)
                return res.status(201).json({ message: "Verifikasi email telah dikirim ke akun email Anda, mohon lakukan verifikasi" })
            }
            return res.status(403).json({ error: true, message: "Harap verifikasi email Anda terlebih dahulu" })
        }
        
        if (user.status === false) {
            return res.status(400).json({ error: true, message: 'Email anda belum atau tidak diaktifkan oleh admin' })
        }
        
        const accessToken = await generateAccessToken(user)

        let refreshToken
        refreshToken = await RefreshToken.findOne({ where:{ userId: user.id }})
        if (!refreshToken) {
            refreshToken = await generateRefreshToken(user)
            await RefreshToken.create({ userId: user.id, token: refreshToken })
        }
        
        res.cookie('refreshToken', refreshToken.token, {
              
            maxAge: 604800000,
            withCredentials: true, 
        })

        res.cookie('accessToken', await generateAccessToken(user), {
            
            withCredentials: true,
        })
        
        res.status(200).json({ 
            success: true , 
            message: "Berhasil Masuk"
        })

        next();

    } catch (error) {
        return res.status(500).send({ error: true, message: error.message })
    }
}

const verificationAccount = async (req, res) => {
    try {
        const { error } = verificationTokenParamsValidation(req.params)
        if (error) {
            return res.status(400).json({ error: true, message: error.message })
        }
        
        const user = await User.findOne({ where: { id: req.params.userId }})

        if (!user) {
            return res.status(400).send({ error: true, message: "Link verifikasi tidak valid" })
        }

        const verificationToken = await VerificationToken.findOne({ where: { userId: user.id, token: req.params.token }})
        if (!verificationToken) {
            return res.status(400).send({ error: true, message: "Link verifikasi tidak valid" })
        }

        await User.update({ isVerified: true }, { where: { id: user.id } });
        await VerificationToken.destroy({ where: { id: verificationToken.id }})

        return res.status(200).json({ success: true, message: "Email berhasil diverifikasi" })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: true, message: error.message })
    }
}

const getUserLogin = async (req, res) => {
    try {
        return res.status(200).json(req.user)
      } catch (error) {
        console.error(error)
        return res.status(500).send({ error: true, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { user } = req

        const { name, username, email, position, role } = req.body

        if (name) {
            user.name = name
        }

        if (username) {
            user.username = username
        }

        if (email) {
            user.email = email
        }

        if (position) {
            user.position = position
        }

        if (role) {
            user.role = role
        }

        await user.save()
        return res.status(200).json({ success: true, message: "Profil pengguna berhasil diperbarui" })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: true, message: error.message })
    }
}

const changePassword = async (req, res) => {
    try {
        const { user } = req

        const { currentPassword, newPassword } = req.body

        const hash = crypto.createHash('sha512');
        const hashedCurrentPassword = hash.update(currentPassword, 'utf-8').digest('hex');
        
        if (hashedCurrentPassword !== user.password) {
            return res.status(401).json({ error: true, message: "Password sebelumnya salah" });
        }

        const newHash = crypto.createHash('sha512');
        const newHashedPassword = newHash.update(newPassword, 'utf-8').digest('hex');

        user.password = newHashedPassword;
        await user.save()
        return res.status(200).json({ success: true, message: "Berhasil ubah password" })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: true, message: error.message })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ where: { email: email }})

        if (!user) {
            return res.status(404).json({ error: true, message: 'User dengan Email ini tidak tersedia' })
        }

        const resetToken = crypto.randomBytes(24).toString('hex')

        await ResetPasswordToken.create({ userId: user.id, token: resetToken })

        const resetURL = `http://localhost:5173/reset-password/${user.id}/${resetToken}`
        await sendEmailResetPassword(user.email, resetURL)

        return res.status(200).json({ success: true, message: 'Email Reset Password berhasil dikirim' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: true, message: error.message })
    }
}

const checkIdAndTokenResetPassword = async (req, res) => {
    try {
        const { userId, token } = req.body;

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: true, message: 'User tidak ditemukan' });
        }

        const resetToken = await ResetPasswordToken.findOne({ where: { userId: userId, token: token } });

        if (!resetToken) {
            return res.status(400).json({ error: true, message: 'Token Reset tidak valid' });
        }

        return res.status(200).json({ success: true, message: 'Token Reset valid' });
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { userId, token } = req.params
        const { password } = req.body

        const user = await User.findOne({ where : { id: userId }})

        if (!user) {
            return res.status(404).json({ error: true, message: 'User tidak ditemukan' })
        }

        const resetToken = await ResetPasswordToken.findOne({ where: { userId, token }})

        if (!resetToken) {
            return res.status(400).json({ error: true, message: 'Token Reset tidak valid' })
        }

        const hash = crypto.createHash('sha512')
        const hashedPassword = hash.update(password, 'utf-8').digest('hex')

        user.password = hashedPassword
        await user.save()
        await ResetPasswordToken.destroy({ where: { userId: user.id }})

        return res.status(200).json({ success: true, message: 'Password berhasil diubah' })
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message })
    }
}

const logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/');
}

module.exports = {
    checkToken,
    register,
    login,
    verificationAccount,
    getUserLogin,
    updateProfile,
    changePassword,
    forgotPassword,
    checkIdAndTokenResetPassword,
    resetPassword,
    logout
}