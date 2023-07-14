const joinsService = require('../services/joins.service')

module.exports = {
    getAllCitiesWithCountries : async (req,res) => {
        try {
            const response = await joinsService.getAllCitiesWithCountries(req)
            return res.send({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

}