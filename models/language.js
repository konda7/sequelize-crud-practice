const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')

class language extends Model{}

language.init({
    language_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false,
    sequelize,
    modelName: 'language'
})

module.exports = language