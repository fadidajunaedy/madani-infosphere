module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        position: {
            type: DataTypes.ENUM(
                "Executive Director", 
                "Deputy Director", 
                "Knowledge Management", 
                "Program Manager", 
                "Biofuel", 
                "Klima", 
                "Green Development", 
                "Komodo",
                "Comms", 
                "HRGA", 
                "Finance"
            ),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("user", "admin", "super-admin"),
            defaultValue: "user"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    })

    const VerificationToken = sequelize.define("verificationToken", {
        userId: { 
            type: DataTypes.INTEGER, 
            references: {
                model: User,
                key: 'id', 
            },
            allowNull: false
        },
        token: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        createdAt: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })

    const RefreshToken = sequelize.define("refreshToken", {
        userId: { 
            type: DataTypes.INTEGER, 
            references: {
                model: User,
                key: 'id', 
            },
            allowNull: false
        },
        token: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        createdAt: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })

    const ResetPasswordToken = sequelize.define("resetPasswordToken", {
        userId: { 
            type: DataTypes.INTEGER, 
            references: {
                model: User,
                key: 'id', 
            },
            allowNull: false
        },
        token: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        createdAt: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })

    User.hasOne(VerificationToken, {
        foreignKey: 'userId',
        as: 'verificationTokens'
    })
    
    VerificationToken.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    })
    
    User.hasOne(RefreshToken, {
        foreignKey: 'userId',
        as: 'refreshTokens'
    })
    
    RefreshToken.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    })
    
    User.hasOne(ResetPasswordToken, {
        foreignKey: 'userId',
        as: 'resetPasswordTokens'
    })
    
    ResetPasswordToken.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    })
    
    return { User, VerificationToken, RefreshToken, ResetPasswordToken }

}