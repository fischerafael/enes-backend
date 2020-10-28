const { Router } = require('express')

const UserController = require('../controllers/UserController')

const routes = Router()

routes.get('/', (req, res) => {
    res.send('hello world')
})

routes.post('/users', UserController.createUser)
routes.get('/users', UserController.getUsers)
routes.delete('/users/:user_id', UserController.deleteUser)

module.exports = routes