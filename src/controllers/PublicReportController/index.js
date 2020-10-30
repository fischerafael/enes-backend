const Report = require('../../models/Report')

const { createUrlFromFileName } = require('../../helpers/getImageUrl')

module.exports = {

    async getReportById(req, res) {

        const { report_id } = req.params

        try {

            const report = await Report.findById(report_id)

            if (!report) return res.status(404).json({
                message: 'Report not found'
            })

            const imgUrl = createUrlFromFileName(report.reportThumbnail)
            
            return res.status(200).json({ report, imgUrl })

        } catch(err) {

            return res.status(400).json(err)

        }

    }

}