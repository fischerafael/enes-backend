const { Router } = require('express')

const uploadSingleImage = require('../helpers/multer')

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')
const ReportController = require('../controllers/ReportController')
const PublicReportController = require('../controllers/PublicReportController')
const PublicReportsController = require('../controllers/PublicReportsController')
const ConfirmationController = require('../controllers/ConfirmationController')

const { verifyToken } = require('../middlewares/auth')

const routes = Router()

routes.get('/', (req, res) => {
    res.send('hello world')
})

routes.post('/users', UserController.createUser)
routes.get('/users', UserController.getUsers)
routes.delete('/users/:user_id', verifyToken, UserController.deleteUser)

routes.post('/sessions', SessionController.create)

routes.post('/users/:user_id/reports', verifyToken, uploadSingleImage('reportThumbnail'), ReportController.createReport)
routes.get('/users/:user_id/reports', verifyToken, ReportController.getReportsByAuthor)
routes.delete('/users/:user_id/reports/:report_id', verifyToken, ReportController.deleteReport)

routes.get('/reports', PublicReportsController.getAllReports)

routes.get('/reports/:report_id', PublicReportController.getReportById)

routes.post('/reports/:report_id/confirmation/:user_id/confirm', verifyToken, ConfirmationController.ConfirmReport)
routes.post('/reports/:report_id/confirmation/:user_id/undo', verifyToken, ConfirmationController.UndoConfirmation)

module.exports = routes