const Sequelize = require('sequelize')

const sequelize = new Sequelize('dvdrental','postgres','konda7412386',{
    host: 'localhost',
    dialect: 'postgres',
    define: {
        logging: false
    }
})

module.exports = sequelize
