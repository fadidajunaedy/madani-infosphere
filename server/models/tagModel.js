module.exports = (sequelize, DataTypes) => {

    const Tag = sequelize.define("tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        timestamps: true
    })

    return Tag

}