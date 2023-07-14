const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')

class country extends Model{
    static associate(models) {
        country.hasMany(models.city, { foreignKey: 'country_id' }) //Even if we didn't specify this cities api works
    }
}

country.init({
    country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
    modelName: 'country'
})

module.exports = country