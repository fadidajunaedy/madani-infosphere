const nodemailer = require("nodemailer")

const sendEmailVerification = async (email, url) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "mail.madani-infosphere.id",
			port: 465,
			secure: true,
			auth: {
				user: "madani@madani-infosphere.id",
				pass: "Qq332211-",
			},
		})

		await transporter.sendMail({
			from: "madani@madani-infosphere.id",
			to: email,
			subject: "Madani Infosphere Account Verification",
			html: `
                <p>Hallo,</p><br/>
                <p>Terima kasih telah mendaftar di Madani Infosphere, klik link di bawah ini untuk memverifikasi email Anda :</p>
                <a href="${url}">${url}</a>
                <p>Link ini akan kedaluwarsa dalam 24 jam. Jika Anda tidak mendaftar untuk akun Madani Infosphere, Anda dapat mengabaikan email ini.</p>
				<br/>
                <p>Best,</p>
                <p>Madani Team</p>
            `,
		})
	} catch (error) {
		return error;
	}
}

const sendEmailResetPassword = async (email, url) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "mail.madani-infosphere.id",
			port: 465,
			secure: true,
			auth: {
				user: "madani@madani-infosphere.id",
				pass: "Qq332211-",
			},
		})

		await transporter.sendMail({
			from: "madani@madani-infosphere.id",
			to: email,
			subject: "Madani Infosphere Reset Password",
			html: `
                <p>Hi there,</p><br/>
                <p>If you've lost your password or wish to reset it, use link below to get started.</p>
                <a href="${url}">${url}</a>
                <p>This link will expire in 1 hours. If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.</p>
				<br/>
                <p>Best,</p>
                <p>The Madani Team</p>
            `,
		})
	} catch (error) {
		return error;
	}
}

module.exports = {
	sendEmailVerification,
	sendEmailResetPassword
}
