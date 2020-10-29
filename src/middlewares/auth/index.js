const jwt = require('../../helpers/jsonwebtoken')

module.exports = {

    verifyToken(req, res, next) {
        
        const { token } = req.headers

        if (!token) return res.status(400).json({
            message: 'No token'
        })

        try {

            const verified = jwt.verifyToken(token)
            req.user = verified

        } catch(err) {

            return res.status(400).json(err)

        }       
        
        next()

    }

}