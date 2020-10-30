const { Router } = require('express')

const uploadFile = require('../helpers/multer')

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')
const ReportController = require('../controllers/ReportController')
const PublicReportController = require('../controllers/PublicReportController')
const PublicReportsController = require('../controllers/PublicReportsController')

const authenticate = require('../middlewares/auth')

const routes = Router()

routes.get('/', (req, res) => {
    res.send('hello world')
})

routes.post('/users', UserController.createUser)
routes.get('/users', UserController.getUsers)
routes.delete('/users/:user_id', authenticate.verifyToken, UserController.deleteUser)

routes.post('/sessions', SessionController.create)

routes.post('/users/:user_id/reports', authenticate.verifyToken, uploadFile.single('reportThumbnail'), ReportController.createReport)
routes.get('/users/:user_id/reports', authenticate.verifyToken, ReportController.getReportsByAuthor)
routes.delete('/users/:user_id/reports/:report_id', authenticate.verifyToken, ReportController.deleteReport)

routes.get('/reports', PublicReportsController.getAllReports)

routes.get('/reports/:report_id', PublicReportController.getReportById)

module.exports = routes