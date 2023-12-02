module.exports = (sequelize, DataTypes) => {

    const Report = sequelize.define('report', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subcategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.TEXT,
            get() {
                return this.getDataValue('tags').split(';')
            },
            set(val) {
               this.setDataValue('tags', val.join(';'));
            },
        },
        file: {
            type: DataTypes.STRING,
        },
        linkFile: {
            type: DataTypes.STRING,
        },
        relatedProgram: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.STRING
        },
        createdUser: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });
    

    return Report

}