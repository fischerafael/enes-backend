const Report = require('../../models/Report')

const { convertKmToM } = require('./helpers')

module.exports = {

    async getAllReports(req, res) {

        const { longitude, latitude, distance, limit } = req.query

        const distanceInMeters = convertKmToM(distance) 
        
        const params = {
            longitude: longitude || 0,
            latitude: latitude || 0,
            maxDistance: distanceInMeters || 1000,
            limit: Number(limit) || 50
        }        

        try {

            const allReports = await Report.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [params.longitude, params.latitude]
                        },
                        $maxDistance: params.maxDistance
                    }
                }
            }).limit(params.limit)

            return res.status(200).send(allReports)

        } catch(err) {

            return res.status(400).json(err)

        }

    }

}