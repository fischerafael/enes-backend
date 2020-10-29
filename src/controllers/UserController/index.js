const bcrypt = require('../../helpers/bcryptjs')
const userControllerHelpers = require('./helpers')

const User = require('../../models/User')

module.exports = {

    async createUser(req, res) {

        const bodyData = req.body
        const { email, password } = bodyData        
        
        try {

            const hasUser = await User.findOne({ email: email })
            if (hasUser) return res.status(400).json({
                message: 'User already exists'                
            })

            const encryptedPassword = await bcrypt.encryptPassword(password)            

            const createdUser = await User.create({
                email: email,
                password: encryptedPassword
            })

            return res.status(201).json(userControllerHelpers.removePassword(createdUser))

        } catch(err) {

            return res.status(400).json(err)

        }        

    },

    async getUsers(req, res) {        

        try {

            const users = await User.find()

            const usersResponse = users.map(user => userControllerHelpers.removePassword(user))

            return res.status(200).json(usersResponse)

        } catch(err) {

            return res.status(400).json(err)

        }        

    },

    async deleteUser(req, res) {

        const { user_id } = req.params
        const { payload } = req.user

        if (payload._id !== user_id) return res.status(400).json({
            message: 'Operation not allowed'
        })        

        try {

            const deletedUser = await User.findByIdAndRemove(user_id)
            
            if (deletedUser === null) {
                return res.status(400).json({
                    message: 'User does not exist'
                })
            } else {

                const userResponse = userControllerHelpers.removePassword(deletedUser)

                return res.status(200).json({
                    message: 'User deleted successfully',
                    userResponse
                })
            }            

        } catch(err) {

            return res.status(400).json(err)

        }

    }

}