const User = require('../../models/User')

const bcrypt = require('../../helpers/bcryptjs')
const jwt = require('../../helpers/jsonwebtoken')

module.exports = {

    async create(req, res) {

        const bodyData = req.body
        const { email, password } = bodyData

        try {

            const hasUser = await User.findOne({
                email: email
            })

            if (!hasUser) return res.status(404).json({
                message: 'User does not exist'
            })        
            
            const passwordDTO = {
                requestPass: password,
                responsePass: hasUser.password
            }

            const validPassword = await bcrypt.decryptPassword(passwordDTO)            

            if (!validPassword) return res.status(400).json({
                message: 'Password incorrect'
            })

            const payload = {
                email: hasUser.email,
                _id: hasUser._id
            }

            const token = jwt.createToken(payload)

            return res.status(200).json({
                message: 'Logged In',
                token
            })

        } catch(err) {

            return res.status(400).json(err)

        }
       
        //gerar um token de acesso

    }
 
}