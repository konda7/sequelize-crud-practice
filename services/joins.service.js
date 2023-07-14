
const city = require('../models/city')
const country = require('../models/country')

country.associate({ city })
city.associate({ country })

module.exports = {
    
    getAllCitiesWithCountries : async (request) => { 
        const cities = await city.findAll({
            attributes: ['city_id','city','country_id'],
            include: {
                model: country,
                as: 'location',
                attributes: ['country'],
                where: {
                    country: "Spain"
                }
            },
            limit: 5
        })
        return cities
    },


}