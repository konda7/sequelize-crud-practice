const sequelize = require('./dbConnection')
const { Op } = require('sequelize')
const express = require('express')

const actor = require('./models/actor')
const city = require('./models/city')
const country = require('./models/country')
const user = require('./models/user')
const film = require('./models/film')
const filmActor = require('./models/filmActor')

const app = express()

app.use(express.json())

app.listen(3000, () => {console.log('Server is running at http://localhost:3000/')})


const joinsRouter = require('./routes/joins.router')

//Basic Concepts
// app.use('')


//Advanced concepts 
app.use('/api/advanced/joins', joinsRouter)









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

app.get('/countries', async (request,response) => {
    try{
        const countries = await country.findAll({
            include: city
        })
        response.send(countries)
    }catch(error){
        console.log(`DB error: ${error}`)
    }
})

app.get('/films', async (request,response) => {
    try {
        const films = await film.findAll({
            order: [['film_id'],['rental_rate','DESC']]
        })
        response.send(films)
    } catch (error) {
        return error
    }
})

app.get('/film-actors', async (request,response) => {
    try {
        const filmActors = await filmActor.findAll({
            order: ['actor_id']
        })
        response.send(filmActors)
    } catch (error) {      
        return error
    }
})

film.associate({ actor })
actor.associate({ film })
app.get('/actor-movies', async (request,response) => {
    try {
        const allActorMovies = await film.findAll({
            include: ['filmActor']
        })
        response.send(allActorMovies)
    } catch (error) {
        return error
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