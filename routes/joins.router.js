const { route } = require('../app')
const joinsController = require('../controllers/joins.controller')

const router = require('express').Router()

//one-to-one relation 
router.get('', )

//one-to-many relation
router.get('/cities', joinsController.getAllCitiesWithCountries)

module.exports = router