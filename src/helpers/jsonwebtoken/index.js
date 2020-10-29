const jwt = require('jsonwebtoken')

const secretKey = process.env.TOKEN_SECRET_KEY
const expirationTime = process.env.TOKEN_EXPIRATION_TIME

module.exports = {

    createToken(payload) {     
        
        const token = jwt.sign({ payload }, secretKey, { expiresIn: expirationTime })
        
        return token

    },

    verifyToken(token) {

        const validToken = jwt.verify(token, secretKey)

        return validToken

    }

}