const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        // operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

const authModels = require('./userModel.js')(sequelize, DataTypes)
db.user = authModels.User
db.verificationToken = authModels.VerificationToken
db.refreshToken = authModels.RefreshToken
db.resetPasswordToken = authModels.ResetPasswordToken
db.tag = require('./tagModel.js')(sequelize, DataTypes)
db.report = require('./reportModel.js')(sequelize, DataTypes)
db.event = require('./eventModel.js')(sequelize, DataTypes)
db.contact = require('./contactModel.js')(sequelize, DataTypes)

db.sequelize.sync()
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
})

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// })

module.exports = db
