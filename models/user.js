const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')

class user extends Model{}

user.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},{
    freezeTableName: true,
    sequelize,
    modelName: 'user'
})

const syncUserTable = async () => user.sync() 
syncUserTable()


module.exports = user