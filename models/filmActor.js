const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')

class filmActor extends Model{
    static associate(models){

    }
}

filmActor.init({
    actor_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true, //Composite primary key
        allowNull: false,
        references: {
            model: 'actor',
            key: 'actor_id'
        }
    },
    film_id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'film',
            key: 'film_id'
        }
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
    modelName: 'film_actor'  //beware of snake case
})

module.exports = filmActor