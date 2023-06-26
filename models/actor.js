const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')

class actor extends Model{}

actor.init({
    actor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
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
    modelName: 'actor'

})

module.exports = actor