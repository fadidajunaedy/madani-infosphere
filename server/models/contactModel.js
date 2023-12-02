module.exports = (sequelize, DataTypes) => {

    const Contact = sequelize.define("contact", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        institution: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        telephone: {
            type: DataTypes.TEXT,
        },
        position: {
            type: DataTypes.STRING,
        },
        classification: {
            type: DataTypes.STRING,
        },
        createdUser: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    })

    return Contact

}