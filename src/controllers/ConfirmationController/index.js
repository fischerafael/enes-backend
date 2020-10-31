const Report = require('../../models/Report')

const { validateOnwership } = require('../helpers')

module.exports = {

    async ConfirmReport(req, res) {

        const { report_id, user_id } = req.params
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

            const report = await Report.findById(report_id)

            if (!report) return res.status(404).json({ message: 'Report not found' })

            if (report.reportConfirmation.includes(user_id)) return res.status(400).json({
                message: 'Report already confirmed'
            })
                
            report.reportConfirmation.push(user_id)

            const reportResponse = await report.save()

            return res.status(200).json(reportResponse)


        } catch(err) {

            return res.status(400).json(err)

        }

    },

    async UndoConfirmation(req, res) {

        const { report_id, user_id } = req.params
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

            const report = await Report.findById(report_id)

            if (!report) return res.status(404).json({ message: 'Report not found' })

            if (!report.reportConfirmation.includes(user_id)) return res.status(400).json({
                message: 'You can not undo confirmation in a report that was never confirmed'
            })

            report.reportConfirmation.pull(user_id)

            const reportResponse = await report.save()

            return res.status(200).json(reportResponse)


        } catch(err) {

            return res.status(400).json(err)

        }

    }

}