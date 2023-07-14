const { DataTypes,Model } = require('sequelize')
const sequelize = require('../dbConnection')
const language = require('./language')

class film extends Model{
    static associate(models){
        film.belongsToMany(models.actor, { through: "filmActor" })
    }
}

film.init({
    film_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        allowIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: DataTypes.TEXT,
    release_year: DataTypes.INTEGER,
    language_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: language,
            key: "language_id"
        }
    },
    rental_duration: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 3
    },
    rental_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 4.99
    },
    length: DataTypes.SMALLINT,
    replacement_cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 19.99
    },
    rating: {
        type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
        defaultValue: 'G'
    },
    last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    special_features: DataTypes.TEXT,
    fulltext: {
        type: DataTypes.TSVECTOR,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    sequelize,
    modelName: 'film'
})

module.exports = film