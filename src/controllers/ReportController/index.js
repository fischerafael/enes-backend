const Report = require('../../models/Report')

const { validateOnwership } = require('../helpers')

module.exports = {

    async createReport(req, res) {

        const bodyData = req.body
        const { user_id } = req.params
        const { payload } = req.user

        const { 
            candidateName,
            partyName,
            partyNumber,
            reportDescription,
            latitude,
            longitude
        } = bodyData

        const onwershipValidationDTO = {
            reqBodyId: user_id, 
            tokenId: payload._id
        }

        const isOwnershipValid = validateOnwership(onwershipValidationDTO)
        if (isOwnershipValid === false) return res.status(400).json({
            message: 'Operation not allowed'
        })

        const reportData = {
            candidateName: candidateName,
            candidateParty: {
                partyName: partyName,
                partyNumber: partyNumber
            },
            reportDescription: reportDescription,
            reportLocation: {
                type: 'Point',
                coordinates: [latitude, longitude]
            },
            reportAuthor: user_id,
            reportConfirmation: [user_id]
        }

        try {

            const newReport = await Report.create(reportData)
            return res.status(201).json(newReport)

        } catch(err) {

            return res.status(400).json(err)

        }

    },

    async getReportsByAuthor(req, res) {

        const { user_id } = req.params
        const { payload } = req.user

        const onwershipValidationDTO = {
            reqBodyId: user_id, 
            tokenId: payload._id
        }

        const isOwnershipValid = validateOnwership(onwershipValidationDTO)
        if (isOwnershipValid === false) return res.status(400).json({
            message: 'Operation not allowed'
        })

        try {

            const reportsOfAnUser = await Report.find({ reportAuthor: user_id })
            return res.status(200).json(reportsOfAnUser)

        } catch(err) {

            return res.status(400).json(err)

        }

    },

    async deleteReport(req, res) {
        
        const { user_id, report_id } = req.params
        const { payload } = req.user

        const onwershipValidationDTO = {
            reqBodyId: user_id, 
            tokenId: payload._id
        }

        const isOwnershipValid = validateOnwership(onwershipValidationDTO)
        if (isOwnershipValid === false) return res.status(400).json({
            message: 'Operation not allowed'
        })

        try {

            const deletedReport = await Report.findByIdAndRemove(report_id)

            if (deletedReport === null) return res.status(404).json({
                message: 'Report not found'
            })

            return res.status(200).json({
                message: 'Report deleted successfully',
                deletedReport
            })

        } catch(err) {

            return res.status(400).json(err)

        }

    }

}