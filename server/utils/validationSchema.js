const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const registerBodyValidation = (body) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required().error(new Error("Nama harus diisi")),
            username: Joi.string().required().error(new Error("Username harus diisi")),
            email: Joi.string().email().required().error(new Error("Email harus diisi")),
            position: Joi.string().required().error(new Error("Jabatan harus diisi")),
            role: Joi.string().default("user").error(new Error("Role harus diisi")),
            password: passwordComplexity().required().error(new Error("Password harus diisi")),
            confirmPassword: passwordComplexity().error(new Error("Konfirmasi Password harus diisi")),
            isVerified: Joi.boolean().default(false).error(new Error("isVerified harus diisi")),
            status: Joi.boolean().default(false).error(new Error("Status harus diisi")),
        });
        const result = schema.validate(body);
        return result;
    } catch (error) {
        return { error: true, message: "An error occurred during validation." };
    }
}

const loginBodyValidation = (body) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required().error(new Error("Email harus diisi")),
            password: passwordComplexity().required().error(new Error("Password harus diisi")),
        });
        const result = schema.validate(body);
        return result;
    } catch (error) {
        return { error: true, message: "An error occurred during validation." };
    }
}

const verificationTokenParamsValidation = (params) => {
    const schema = Joi.object({
        userId: Joi.string().required().error(new Error("User ID harus diisi")),
        token: Joi.string().required().error(new Error("Token harus diisi")),
    });
    return schema.validate(params);
}

const refreshTokenCookiesValidation = (cookies) => {
    const schema = Joi.string().required().label("Refresh Token")
    return schema.validate(cookies);
}

const reportBodyValidation = (body) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().error(new Error("Judul harus diisi")),
            category: Joi.string().required().error(new Error("Kategori harus diisi")),
            subcategory: Joi.string().required().error(new Error("Sub Kategori harus diisi")),
            description: Joi.string().required().error(new Error("Deskripsi harus diisi")),
            tags: Joi.array().items(Joi.string()).required().error(new Error("Tags harus diisi")),
            file: Joi.any(),
            linkFile: Joi.any(),
            year: Joi.when('subcategory', {
                is: Joi.not('peraturan-dan-regulasi'),
                then: Joi.string().required().error(new Error("Tahun harus diisi")),
                otherwise: Joi.optional()
            }),
            relatedProgram: Joi.when('subcategory', {
                is: Joi.any().valid('peraturan-dan-regulasi', 'db-tabular', 'db-spasial'),
                then: Joi.string().required().error(new Error("Program Terkait harus diisi")),
                otherwise: Joi.optional()
            }),
            createdUser: Joi.string().required().error(new Error("Created User harus diisi"))
        })
        const result = schema.validate(body)
        return result
    } catch (error) {
        return { error: true, message: "An error occurred during validation." }
    }
}

const contactBodyValidation = (body) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required().error(new Error("Nama harus diisi")),
            institution: Joi.string().required().error(new Error("Institusi harus diisi")),
            email: Joi.string().required().error(new Error("Email harus diisi")),
            city: Joi.string().required().error(new Error("Kota/Negara harus diisi")),
            telephone: Joi.any().error(new Error("Nomor Telepon harus diisi")),
            position: Joi.string().required().error(new Error("Jabatan harus diisi")),
            category: Joi.string().required().error(new Error("Kategori harus diisi")),
            classification: Joi.string().required().error(new Error("Klasifikasi Telepon Harus diisi harus diisi")),
            createdUser: Joi.string().required().error(new Error("Created User harus diisi"))
        });
        const result = schema.validate(body);
        return result;
    } catch (error) {
        return { error: true, message: "An error occurred during validation." };
    }
}

const eventBodyValidation = (body) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().error(new Error("Judul harus diisi")),
            description: Joi.string().required().error(new Error("Deskripsi harus diisi")),
            theme: Joi.string().required().error(new Error("Tema Warna harus diisi")),
            startDate: Joi.string().required().error(new Error("Tanggal Mulai harus diisi")),
            startTime: Joi.string().required().error(new Error("Waktu Mulai harus diisi")),
            endDate: Joi.string().required().error(new Error("Tangal Berakhir harus diisi")),
            endTime: Joi.string().required().error(new Error("Waktu Berakhur harus diisi")),
            createdUser: Joi.string().required().error(new Error("Created User harus diisi")),
        })

        const result = schema.validate(body)
        return result
    } catch (error) {
        return { error: true, message: "An error occurred during validation." }
    }
}

const tagBodyValidation = (body) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().error(new Error("Nama Tag harus diisi"))
        })

        const result = schema.validate(body)
        return result
    } catch (error) {
        return { error: true, message: "An error occurred during validation." }
    }
}

module.exports = {
    registerBodyValidation,
    loginBodyValidation,
    verificationTokenParamsValidation,
    refreshTokenCookiesValidation,
    reportBodyValidation,
    contactBodyValidation,
    eventBodyValidation,
    tagBodyValidation
}