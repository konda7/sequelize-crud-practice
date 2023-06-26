const sequelize = require('./dbConnection')
const { Op } = require('sequelize')
const express = require('express')

const actor = require('./models/actor')
const city = require('./models/city')
const country = require('./models/country')
const user = require('./models/user')
const { count } = require('./models/actor')

const app = express()

app.use(express.json())

app.listen(3000, () => {console.log('Server is running at http://localhost:3000/')})


//API-1 INSERT clause 
app.post('/users', async (request, response) => {
    const userDetails = request.body
    try {
        const userId = await user.create({
            first_name: userDetails.first_name, 
            last_name:userDetails.last_name,
            email: userDetails.email
        })    
        response.send(userId)
    } catch (error) {
        console.log(`DB error: ${error}`)
    }
})

app.get('/users', async (request,resposne) => {
    try {
        const allUsers = await user.query("SELECT * FROM user;")
        resposne.send(allUsers)
    } catch (error) {
        console.log(`DB error: ${error}`)
    }
})

//API-2 SELECT clause with querying
app.get('/actors', async (request,response) => {
    try{
        const actors = await actor.findAll({offset:10, limit: 10})
        response.send(actors)
    }catch(error){
        console.log(`DB error: ${error}`)
    }
})


country.hasMany(city, { foreignKey: 'country_id' })
city.belongsTo(country, { foreignKey: 'country_id' })

app.get('/cities', async (request,response) => {
    try{
        const cities = await city.findAll({include: country})
        response.send(cities)
    }catch(error){
        console.log(`DB error: ${error}`)
    }
})

app.get('/countries', async (request,response) => {
    try{
        const countries = await country.findAll(
            {
                include: { model: city, as: 'cities' }
            }
        )
        response.send(countries)
    }catch(error){
        console.log(`DB error: ${error}`)
    }
})

//API-3 Get a specific actor details from actor table based on a condition
app.get('/actors/:actorId', async (request, response) => {
    const { actorId } = request.params
    try {
        const actorDetails = await actor.findOne({
            where: {
                actor_id: actorId
            }
        })
        response.send(actorDetails)
    } catch (error) {
        console.log(`DB error: ${error}`)
    }
})




module.exports = app