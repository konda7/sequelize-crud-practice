const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')

class city extends Model{}

city.init({
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'country',
            key: 'country_id'
        }
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    freezeTableName: true,
    timestamps: false,
    sequelize,
    modelName: 'city'
})


module.exports = city