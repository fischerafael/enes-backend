const { Router } = require('express')

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

const authenticate = require('../middlewares/auth')

const routes = Router()

routes.get('/', (req, res) => {
    res.send('hello world')
})

routes.post('/users', UserController.createUser)
routes.get('/users', UserController.getUsers)
routes.delete('/users/:user_id', authenticate.verifyToken, UserController.deleteUser)

routes.post('/sessions', SessionController.create)

module.exports = routes