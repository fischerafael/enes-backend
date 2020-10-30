const Report = require('../../models/Report')

module.exports = {

    async getReportById(req, res) {

        const { report_id } = req.params

        try {

            const report = await Report.findById(report_id)

            if (!report) return res.status(404).json({
                message: 'Report not found'
            })

            return res.status(200).json(report)

        } catch(err) {

            return res.status(400).json(err)

        }

    }

}